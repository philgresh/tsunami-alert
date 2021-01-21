/* Amplify Params - DO NOT EDIT
	API_TSUNAMIALERT_GRAPHQLAPIIDOUTPUT
	API_TSUNAMIALERT_PHONETABLE_ARN
	API_TSUNAMIALERT_PHONETABLE_NAME
	ENV
	FUNCTION_SENDVERIFICATIONCODE_NAME
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const { promisify } = require('es6-promisify');
const randomNumber = require('random-number-csprng');
const crypto = require('crypto');

const hash = crypto.createHash('sha256');

const INSERT = 'INSERT';
const TABLE_NAME = process.env.API_TSUNAMIALERT_PHONETABLE_NAME;
const SEND_VERIFICATION_CODE_LAMBDA =
  process.env.FUNCTION_SENDVERIFICATIONCODE_NAME;

AWS.config.update({ region: process.env.REGION });

const dynamodb = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: process.env.REGION,
});

const lambda = new AWS.Lambda({
  region: process.env.REGION,
});

const { unmarshall } = AWS.DynamoDB.Converter;
const updatePromise = promisify(dynamodb.updateItem.bind(dynamodb));
const invokePromise = promisify(lambda.invoke.bind(lambda));

exports.handler = async (event) => {
  const insertions = event.Records.filter(
    (record) => record.eventName === INSERT,
  );
  if (insertions.length === 0) {
    console.log('No insertion records', JSON.stringify(event, null, 2));
    return Promise.resolve('Successfully processed records');
  }

  return Promise.all(
    insertions.map(async function (record) {
      const data = unmarshall(record.dynamodb.NewImage);
      return prepUpdatePromise(data.id);
    }),
  )
    .then((res) => {
      console.log('Processed records', { res });
    })
    .catch((err) => console.error(err));
};

async function prepUpdatePromise(id) {
  const randInt = await genRandInt();
  const hashDigest = genHashDigest(randInt.toString());

  console.log('Generated random integer and hash', { id, randInt, hashDigest });

  const params = {
    ExpressionAttributeNames: {
      '#C': 'verificationCode',
      '#V': 'verified',
      '#S': 'subscribed',
    },
    ExpressionAttributeValues: {
      ':c': {
        S: hashDigest,
      },
      ':v': {
        BOOL: false,
      },
      ':s': {
        BOOL: false,
      },
    },
    Key: {
      id: {
        S: id,
      },
    },
    ReturnValues: 'ALL_NEW',
    TableName: TABLE_NAME,
    UpdateExpression: 'SET #C = :c, #V = :v, #S = :s',
  };

  return updatePromise(params)
    .then(async (res) => {
      const record = unmarshall(res.Attributes);
      console.log(
        `Successfully updated ${id}:`,
        JSON.stringify({ record }, null, 2),
      );

      const Payload = JSON.stringify({ record, randInt }, null, 2);
      const response = await invokePromise({
        Payload,
        FunctionName: SEND_VERIFICATION_CODE_LAMBDA,
      })
        .then((result) => result)
        .catch((err) => {
          console.error(err);
          return err;
        });
      console.log(
        'Successfully forwarded to sendVerificationCode lambda',
        JSON.stringify({ response }, null, 2),
      );
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
}

async function genRandInt() {
  try {
    const num = await randomNumber(111111, 999999);
    return num;
  } catch (err) {
    return console.error('Error generating random integer: ', err);
  }
}

function genHashDigest(str) {
  return hash.update(str).digest('hex');
}
