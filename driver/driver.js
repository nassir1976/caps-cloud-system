'use strict';


const { Consumer } = require('sqs-consumer');
// const AWS = require('aws-sdk');
// AWS.config.update({ region: 'us-west-2' });

const app = Consumer.create({
  queueUrl:  `https://sqs.us-west-2.amazonaws.com/114421735820/widget-queue`||`https://sqs.us-west-2.amazonaws.com/114421735820/flower`, //connnect to the vendor
  handleMessage: handler
});

function handler(message) {
  console.log(message);
}

app.on('error', (err) => {
  console.error(err.message);
});
app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();
