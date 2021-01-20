/* Amplify Params - DO NOT EDIT
	ENV
	REGION

  Amplify Params - DO NOT EDIT */const Parser = require('rss-parser');
const AWS = require('aws-sdk');
const { promisify } = require('es6-promisify');

AWS.config.update({ region: process.env.REGION });

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const parser = new Parser();

const baseParams = {
  TableName: process.env.API_TSUNAMIALERT_ALERTTABLE_NAME,
};

exports.handler = async ({ url }) => {
  console.log({ url });
  let feed = await parser.parseURL(url);

  const getItemPromise = promisify(dynamodb.getItem);

  const itemsPromises = [];

  feed.items.forEach((item) => {
    const { id } = item;
    const uuidIdx = id.search(/uuid\:/);
    if (uuidIdx === -1) return; // id is not formatted as expected
    const uuid = id.slice(uuidIdx + 5);
    const params = {
      ...baseParams,
      Key: {
        id: {
          S: uuid,
        },
      },
    };
    itemsPromises.push(
      getItemPromise(params)
        .then((response) => console.log({ response }))
        .catch((err) => console.error({ err })),
    );
  });
  const results = await Promise.all(itemsPromises);
  console.log({ feed, items: feed.items, results });
};
