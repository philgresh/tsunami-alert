/* Amplify Params - DO NOT EDIT
	API_TSUNAMIALERT_GRAPHQLAPIIDOUTPUT
	API_TSUNAMIALERT_PHONETABLE_ARN
	API_TSUNAMIALERT_PHONETABLE_NAME
	AUTH_TSUNAMIALERT97A1C8BA_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');
const { promisify } = require('es6-promisify');
const crypto = require('crypto');
const { isValidPhoneNumber } = require('libphonenumber-js');

const MIN = 101001;
const MAX = 999999;
const TABLE_NAME = process.env.API_TSUNAMIALERT_PHONETABLE_NAME;
const { SNS_TOPIC_ARN } = process.env;

AWS.config.update({ region: process.env.REGION });

const dynamodb = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: process.env.REGION,
});

const sns = new AWS.SNS({
  apiVersion: '2010-03-31',
  region: process.env.REGION,
});

const { unmarshall } = AWS.DynamoDB.Converter;
const updatePromise = promisify(dynamodb.updateItem.bind(dynamodb));
const subscribePromise = promisify(sns.subscribe.bind(sns));

/**
 * @param event - Includes `arguments` and `identity`
 * @param context - Not used here
 * @param callback - Return `errors`, `values` to AppSync
 */
exports.handler = async (event, _context, callback) => {
  const { number, verificationCode } = event.arguments;
  const { sub: ownerSub } = event.identity;
  if (!number || !verificationCode) {
    callback('Did not provide correct information!', null);
    return;
  }

  if (!isValidPhoneNumber(number)) {
    console.error('Invalid number:', number);
    callback('Invalid phone number', null);
    return;
  }

  if (!isValidVerificationCode(verificationCode)) {
    console.error('Invalid verification code format:', verificationCode);
    callback('Invalid verification code format', null);
    return;
  }

  const id = genHashDigest(number).slice(0, 37);
  const hashDigest = genHashDigest(verificationCode);
  const now = new Date().toISOString();
  console.log('Trying to verify: ', {
    id,
    verificationCode,
    ownerSub,
  });

  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: {
        S: id,
      },
    },
    ExpressionAttributeNames: {
      '#C': 'verificationCode',
      '#V': 'verified',
      '#S': 'subscribed',
      '#U': 'updatedAt',
      '#O': 'owner',
    },
    ExpressionAttributeValues: {
      ':c': {
        NULL: true,
      },
      ':v': {
        BOOL: true,
      },
      ':s': {
        BOOL: true,
      },
      ':o': {
        S: ownerSub,
      },
      ':u': {
        S: now,
      },
      ':cc': {
        // Verification code challenge
        S: hashDigest,
      },
    },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'SET #C = :c, #V = :v, #S = :s, #U = :u',
    ConditionExpression: '#O = :o AND #C = :cc',
  };

  // Subscribe to SNS topic, then mark as verified/subscribed in database
  let data = {};
  await updatePromise(params)
    .then(function (res) {
      data = {
        ...unmarshall(res.Attributes),
      };
    })
    .catch((err) => {
      if (err.code === 'ConditionalCheckFailedException') {
        console.error(err);
        callback('The phone number or verification code is not correct!', null);
        return;
      }
    });

  await subscribePromise({
    Protocol: 'sms' /* required */,
    TopicArn: SNS_TOPIC_ARN /* required */,
    Endpoint: number,
  }).then(function (result) {
    console.log(
      JSON.stringify({ updateResult: data, snsResult: result }, null, 2),
    );
    callback(null, data);
    return;
  });
};

function genHashDigest(str) {
  const hash = crypto.createHash('sha256');
  return hash.update(str).digest('hex');
}

function isValidVerificationCode(verificationCode) {
  return verificationCode >= MIN && verificationCode <= MAX;
}
