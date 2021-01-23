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

exports.handler = async (event, ctx) => {
  console.log(JSON.stringify({ event, ctx }, null, 2));

  if (!event.identity && !event.identity.sub) throw Error('Not signed in!');
  if (!event.arguments.number) throw Error('Missing number!');

  const owner = event.identity.sub;
  const { number } = event.arguments;
  const randInt = await genRandInt();
  const verificationCode = genHashDigest(randInt.toString());
  const now = new Date().toISOString();
  const id = genHashDigest(number).slice(0, 36); // No need for super long IDs, same length as a UUID

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

  return putPromise(params)
    .then(async (res) => {
      console.log(
        `Successfully added ${id}:`,
        JSON.stringify({ res }, null, 2),
      );

      const Payload = JSON.stringify({ record: { number }, randInt }, null, 2);
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
};

async function genRandInt() {
  try {
    const num = await randomNumber(111111, 999999);
    return num;
  } catch (err) {
    return console.error('Error generating random integer: ', err);
  }
}

function genHashDigest(str) {
  const hash = crypto.createHash('sha256');
  return hash.update(str).digest('hex');
}
