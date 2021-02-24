/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_FETCHFEED_NAME
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const { promisify } = require('es6-promisify');

const { FUNCTION_FETCHFEED_NAME, REGION } = process.env;

AWS.config.update({ region: REGION });

const lambda = new AWS.Lambda({
  region: REGION,
});

const PWTC_ATOM = 'https://www.tsunami.gov/events/xml/PHEBAtom.xml';
const NTWC_ATOM = 'https://www.tsunami.gov/events/xml/PAAQAtom.xml';

exports.handler = async () => {
  const feeds = [PWTC_ATOM, NTWC_ATOM];
  const lambdaInvokePromise = promisify(lambda.invoke.bind(lambda));

  const promises = [];
  feeds.forEach((url) => {
    promises.push(
      lambdaInvokePromise({
        FunctionName: FUNCTION_FETCHFEED_NAME,
        InvocationType: 'Event',
        Payload: JSON.stringify({ url }, null, 2),
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        }),
    );
  });

  await Promise.all(promises);
};
