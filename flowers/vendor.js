
const uuid = require('uuid').v4;
const {Producer} = require('sqs-producer');
// const AWS = require('aws-sdk');
// AWS.config.update({ region: 'us-west-2' });

const producer = Producer.create({
  queueUrl: `https://sqs.us-west-2.amazonaws.com/114421735820/flower`,
  region: `us-west-2`
});
console.log('======pickup')

let counter = 0;

setInterval( async () => {

  try { 
    const message = {
      id: uuid(),
      body: `This is message #${counter++}`
    }
  
    const response = await producer.send(message);
    console.log(response);
  } catch(e) { 
    console.error(e);
  }
}, Math.floor(Math.random() * 1000));



//vendor === publisher sqs publishe