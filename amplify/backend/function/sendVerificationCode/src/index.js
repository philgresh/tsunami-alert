/* Amplify Params - DO NOT EDIT
	API_TSUNAMIALERT_GRAPHQLAPIIDOUTPUT
	API_TSUNAMIALERT_PHONETABLE_ARN
	API_TSUNAMIALERT_PHONETABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const { promisify } = require('es6-promisify');

AWS.config.update({ region: process.env.REGION });

const dynamodb = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: process.env.REGION,
});


exports.handler = async (event) => {
  console.log({event})
  const getItemPromise = promisify(dynamodb.getItem.bind(dynamodb));

};
