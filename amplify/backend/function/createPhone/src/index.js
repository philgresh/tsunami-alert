/* Amplify Params - DO NOT EDIT
	API_TSUNAMIALERT_GRAPHQLAPIENDPOINTOUTPUT
	API_TSUNAMIALERT_GRAPHQLAPIIDOUTPUT
	API_TSUNAMIALERT_PHONETABLE_ARN
	API_TSUNAMIALERT_PHONETABLE_NAME
	AUTH_TSUNAMIALERT97A1C8BA_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const { promisify } = require('es6-promisify');
const randomNumber = require('random-number-csprng');
const crypto = require('crypto');

const hash = crypto.createHash('sha256');

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
  const id = genHashDigest(number);

  const params = {
    TableName: TABLE_NAME,
    Item: {
      id,
      number,
      owner,
      verificationCode,
      verified: false,
      subscribed: false,
      updatedAt: now,
      createdAt: now,
    },
  };

  console.log('Generated random integer and hash', { params });

  // const params = {
  //   ExpressionAttributeNames: {
  //     "#O": 'owner',
  //     "#N": 'number',
  //     '#C': 'verificationCode',
  //     '#V': 'verified',
  //     '#S': 'subscribed',
  //     '#UA': 'updatedAt',
  //     '#CA': 'createdAt',
  //   },
  //   ExpressionAttributeValues: {
  //     ':o': {
  //       S: owner,
  //     },
  //     ':n': {
  //       S: number,
  //     },
  //     ':c': {
  //       S: verificationCode,
  //     },
  //     ':v': {
  //       BOOL: false,
  //     },
  //     ':s': {
  //       BOOL: false,
  //     },
  //     ':ua': {
  //       S: now,
  //     },
  //     ':ca': {
  //       S: now,
  //     },
  //   },
  //   Key: {
  //     id: {
  //       S: id,
  //     },
  //   },
  //   ReturnValues: 'ALL_NEW',
  //   TableName: TABLE_NAME,
  //   UpdateExpression: 'SET #C = :c, #V = :v, #S = :s, #UA = :ua, #CA = :ca',
  // };

  return putPromise(params)
    .then(async (res) => {
      const record = unmarshall(res.Attributes);
      console.log(
        `Successfully added ${id}:`,
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
  return hash.update(str).digest('hex');
}
