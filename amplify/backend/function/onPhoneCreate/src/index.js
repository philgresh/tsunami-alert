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

const INSERT = 'INSERT';
const TABLE_NAME = process.env.API_TSUNAMIALERT_PHONETABLE_NAME;

AWS.config.update({ region: process.env.REGION });

const dynamodb = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: process.env.REGION,
});

const { unmarshall } = AWS.DynamoDB.Converter;
const updatePromise = promisify(dynamodb.updateItem.bind(dynamodb));

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
      const [randInt, newPromise] = await prepUpdatePromise(data.id);
      return newPromise;
    }),
  )
    .then((res) => {
      console.log('Successfully processed records', { res });
    })
    .catch((err) => console.error(err));
};

async function prepUpdatePromise(id) {
  const hash = crypto.createHash('sha256');

  const randInt = await genRandInt();

  const hashDigest = hash.update(randInt.toString()).digest('hex');

  console.log('prep', { id, randInt, hashDigest });

  const params = {
    ExpressionAttributeNames: {
      '#V': 'verificationCode',
    },
    ExpressionAttributeValues: {
      ':v': {
        S: hashDigest,
      },
    },
    Key: {
      id: {
        S: id,
      },
    },
    ReturnValues: 'UPDATED_NEW',
    TableName: TABLE_NAME,
    UpdateExpression: 'SET #V = :v',
  };

  const newPromise = updatePromise(params)
    .then((res) => {
      console.log(
        `Successfully updated ${id}:`,
        JSON.stringify({ attrs: res.Attributes }, null, 2),
      );
      return res;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
  return [randInt, newPromise];
}

async function genRandInt() {
  try {
    const num = await randomNumber(111111, 999999);
    return num;
  } catch (err) {
    return console.error('Error generating random integer: ', err);
  }
}
