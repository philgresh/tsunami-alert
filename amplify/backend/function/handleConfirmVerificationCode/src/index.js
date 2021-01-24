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

const TABLE_NAME = process.env.API_TSUNAMIALERT_PHONETABLE_NAME;

AWS.config.update({ region: process.env.REGION });

const dynamodb = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: process.env.REGION,
});

const { unmarshall } = AWS.DynamoDB.Converter;
const updatePromise = promisify(dynamodb.updateItem.bind(dynamodb));

exports.handler = async (event, context) => {
  const { number, verificationCode } = event.arguments;
  const { sub: ownerSub } = event.identity;
  if (!number || !verificationCode)
    throw Error('Did not provide correct information!');

  const id = genHashDigest(number).slice(0, 37);
  const hashDigest = genHashDigest(verificationCode);
  const now = new Date().toISOString();
  console.log('Trying to verify: ', {
    id,
    hashDigest: verificationCode,
    owner: ownerSub,
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

  let data = {};
  let errors = [];

  await updatePromise(params)
    .then((res) => {
      data = {
        ...unmarshall(res.Attributes),
        verificationCode: null,
      };
    })
    .catch((err) => {
      errors.push(err);
    });
  if (errors.length > 0) {
    console.error(JSON.stringify({ errors }, null, 2));
    context.errors = errors;
  }
  console.log(
    `Successfully updated ${id}:`,
    JSON.stringify({ data, errors }, null, 2),
  );
  return { ...data };
};

function genHashDigest(str) {
  const hash = crypto.createHash('sha256');
  return hash.update(str).digest('hex');
}
