'use strict';
const uuid = require('uuid').v4;
const {Consumer} = require('sqs-consumer');

const app = Consumer.create({
  queueUrl: `https://sqs.us-west-2.amazonaws.com/114421735820/flower`,
  region: `us-west-2`,
  handleMessage:handler
});
function handler(message){
  console.log(message.body)
}
console.log('sending message')
app.on('error', (err) => {
  console.error(err.message);
});
app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();

  



//vendor === publisher sqs publishe