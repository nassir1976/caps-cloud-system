'use strict';


const { Consumer } = require('sqs-consumer');

const app = Consumer.create({
  queueUrl: `https://sqs.us-west-2.amazonaws.com/114421735820/flower`|| `https://sqs.us-west-2.amazonaws.com/114421735820/widget-queue`,
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
