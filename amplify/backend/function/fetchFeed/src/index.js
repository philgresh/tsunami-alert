/* Amplify Params - DO NOT EDIT
	API_TSUNAMIALERT_ALERTTABLE_ARN
	API_TSUNAMIALERT_ALERTTABLE_NAME
	API_TSUNAMIALERT_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const Parser = require('rss-parser');
const AWS = require('aws-sdk');
const { promisify } = require('es6-promisify');

const PWTC_ATOM = 'https://www.tsunami.gov/events/xml/PHEBAtom.xml';
// const NTWC_ATOM = 'https://www.tsunami.gov/events/xml/PAAQAtom.xml';

AWS.config.update({ region: process.env.REGION });

const dynamodb = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: process.env.REGION,
});
const parser = new Parser();

const TableName = process.env.API_TSUNAMIALERT_ALERTTABLE_NAME;

exports.handler = async () => {
  return fetchAndUpdate({ url: PWTC_ATOM });
};

async function fetchAndUpdate({ url }) {
  let feed = await parser.parseURL(url);

  const getItemPromise = promisify(dynamodb.getItem.bind(dynamodb));
  const putItemPromise = promisify(dynamodb.putItem.bind(dynamodb));

  const getItemPromises = [];
  const putItemPromises = [];

  feed.items.forEach((item) => {
    const itemPromise = prepGetItemPromise(getItemPromise, item);
    getItemPromises.push(itemPromise);
  });

  let results = await Promise.all(getItemPromises);

  if (results.length === 0) return;

  results.forEach((result, i) => {
    if (Object.keys(result).length > 0) return;
    const itemPromise = prepPutItemPromise(putItemPromise, feed.items[i]);
    putItemPromises.push(itemPromise);
  });

  results = await Promise.all(putItemPromises);

  console.log({ feed, items: feed.items, results });
  return results;
}

function prepPutItemPromise(putItemPromise, item) {
  const uuid = prepID(item);
  if (!uuid) return null;
  const attrs = prepAttrs(item);

  const now = new Date().toISOString();

  const params = {
    TableName,
    Item: {
      ...attrs,
      id: {
        S: uuid,
      },
      createdAt: {
        S: now,
      },
      updatedAt: {
        S: now,
      },
    },
  };
  return putItemPromise(params)
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      return err;
    });
}

function prepGetItemPromise(getItemPromise, item) {
  const uuid = prepID(item);
  if (!uuid) return null;
  const params = {
    TableName,
    Key: {
      id: {
        S: uuid,
      },
    },
  };

  return getItemPromise(params)
    .then((response) => response)
    .catch((err) => {
      console.error({ err });
      return err;
    });
}

function prepID(item) {
  const { id } = item;
  const uuidIdx = id.search(/uuid\:/);
  if (uuidIdx === -1) return; // id is not formatted as expected
  const uuid = id.slice(uuidIdx + 5);
  return uuid;
}

function prepAttrs(item) {
  const attrs = {};
  Object.entries(item).forEach(([key, val]) => {
    attrs[key] = {
      S: val,
    };
  });
  return attrs;
}
