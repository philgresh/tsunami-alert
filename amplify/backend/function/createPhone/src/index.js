/* Amplify Params - DO NOT EDIT
	API_TSUNAMIALERT_GRAPHQLAPIENDPOINTOUTPUT
	API_TSUNAMIALERT_GRAPHQLAPIIDOUTPUT
	API_TSUNAMIALERT_PHONETABLE_ARN
	API_TSUNAMIALERT_PHONETABLE_NAME
	AUTH_TSUNAMIALERT97A1C8BA_USERPOOLID
	ENV
	FUNCTION_SENDVERIFICATIONCODE_NAME
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const { promisify } = require('es6-promisify');
const randomNumber = require('random-number-csprng');
const crypto = require('crypto');
const isValidPhoneNumber = require('libphonenumber-js').isValidPhoneNumber;

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
const putPromise = promisify(dynamodb.putItem.bind(dynamodb));
const invokePromise = promisify(lambda.invoke.bind(lambda));

exports.handler = async (event, ctx, callback) => {
  // console.log(JSON.stringify({ event, ctx }, null, 2));

  if (!event.identity && !event.identity.sub) throw Error('Not signed in!');
  if (!event.arguments.number) throw Error('Missing number!');

  const owner = event.identity.sub;
  const { number } = event.arguments;

  if (!isValidPhoneNumber(number)) {
    console.error('Invalid number:', number);
    callback('Invalid phone number', null);
    return;
  }

  const randInt = await genRandInt();
  const verificationCode = genHashDigest(randInt.toString());
  const now = new Date().toISOString();
  const id = genHashDigest(number).slice(0, 37); // No need for super long IDs, same length as a UUID

  const newRecord = {
    id,
    number,
    owner,
    verified: false,
    verificationCode: null,
    subscribed: false,
    updatedAt: now,
    createdAt: now,
  };
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: {
        S: id,
      },
      number: {
        S: number,
      },
      owner: {
        S: owner,
      },
      verificationCode: {
        S: verificationCode,
      },
      verified: {
        BOOL: false,
      },
      subscribed: {
        BOOL: false,
      },
      updatedAt: {
        S: now,
      },
      createdAt: {
        S: now,
      },
    },
  };

  let data = {};
  let errors = [];

  await putPromise(params)
    .then(async () => {
      const Payload = JSON.stringify({ record: { number }, randInt }, null, 2);
      data = { ...newRecord };
      return invokePromise({
        Payload,
        FunctionName: SEND_VERIFICATION_CODE_LAMBDA,
      });
    })
    .then((result) => {
      console.log('InvokePromise Result:', result);
    })
    .catch((err) => {
      console.error(err);
      errors.push(err);
    });

  if (data)
    console.log(
      `Successfully added ${id}:`,
      JSON.stringify({ data, errors }, null, 2),
    );
  ctx.result = { ...data };
  if (errors.length > 0) {
    ctx.errors = errors;
  } else errors = null;
  callback(errors, data);
  return { ...data };
};

async function genRandInt() {
  try {
    const num = await randomNumber(101001, 999999);
    return num;
  } catch (err) {
    return console.error('Error generating random integer: ', err);
  }
}

function genHashDigest(str) {
  const hash = crypto.createHash('sha256');
  return hash.update(str).digest('hex');
}
