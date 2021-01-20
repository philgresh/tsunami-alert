/* Amplify Params - DO NOT EDIT
	API_TSUNAMIALERT_GRAPHQLAPIIDOUTPUT
	API_TSUNAMIALERT_PHONETABLE_ARN
	API_TSUNAMIALERT_PHONETABLE_NAME
	ENV
	FUNCTION_SENDVERIFICATIONCODE_NAME
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');

AWS.config.update({ region: process.env.REGION });

const dynamodb = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: process.env.REGION,
});


exports.handler = (event) => {
  //eslint-disable-line
  // console.log(JSON.stringify(event, null, 2));
  // event.Records.forEach(record => {
  //   console.log(record.eventID);
  //   console.log(record.eventName);
  //   console.log('DynamoDB Record: %j', record.dynamodb);
  // });
  const records = event.Records.map((record) => ({
    new: dynamodb.Converter.unmarshall(record.dynamodb.NewImage),
    old: dynamodb.Converter.unmarshall(record.dynamodb.OldImage),
  }));
  console.log(JSON.stringify(records, null, 2));
  return Promise.resolve('Successfully processed DynamoDB record');
};
