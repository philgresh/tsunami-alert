/* Amplify Params - DO NOT EDIT
	API_TSUNAMIALERT_GRAPHQLAPIIDOUTPUT
	API_TSUNAMIALERT_PHONETABLE_ARN
	API_TSUNAMIALERT_PHONETABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');
const REGION = process.env.REGION; 

exports.handler = (event) => {
  console.log({ event });
  const {
    record: { number },
    randInt,
  } = event;

  const Message = `Your verification code for tsunami alerts is: ${randInt}`;

  const params = {
    Message,
    PhoneNumber: number, //PHONE_NUMBER, in the E.164 phone number structure
  };

  const sns = new SNSClient({ region: REGION });

  const run = async () => {
    try {
      const data = await sns.send(new PublishCommand(params));
      console.log('Success, message published. MessageID is ' + data.MessageId);
    } catch (err) {
      console.error(err, err.stack);
    }
  };
  run();
};
