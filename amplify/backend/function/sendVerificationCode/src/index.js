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

const sns = new AWS.SNS({
  apiVersion: '2010-03-31',
  region: process.env.REGION,
});
const publishPromise = promisify(sns.publish.bind(sns));

exports.handler = (event) => {
  console.log({ event });
  const {
    record: { number },
    randInt,
  } = event;

  const Message = `Your verification code is: ${randInt}`;

  const params = {
    Message /* required */,
    MessageAttributes: {
      DataType: 'String' /* required */,
    },
    PhoneNumber: number,
    TopicArn: process.env.SNS_TOPIC_ARN,
  };

  return publishPromise(params)
    .then(function (data) {
      console.log('MessageID is ' + data.MessageId);
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });
};
