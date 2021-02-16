/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_FETCHFEED_NAME
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');

const { FUNCTION_FETCHFEED_NAME } = process.env;

AWS.config.update({ region: process.env.REGION });

const lambda = new AWS.Lambda({
  region: process.env.REGION,
});

const PWTC_ATOM = 'https://www.tsunami.gov/events/xml/PHEBAtom.xml';
// const NTWC_ATOM = 'https://www.tsunami.gov/events/xml/PAAQAtom.xml';

exports.handler = async (_event, context) => {
  lambda.invoke(
    {
      FunctionName: FUNCTION_FETCHFEED_NAME,
      Payload: JSON.stringify({ url: PWTC_ATOM }, null, 2), // pass params
    },
    function (error, data) {
      if (error) {
        context.done('error', error);
      }
      if (data) {
        context.succeed(data);
      }
    },
  );
  // await fetchFeed(NTWC_ATOM);
};
