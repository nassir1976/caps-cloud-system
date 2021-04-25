'use strict';


const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const sns = new AWS.SNS();
const faker = require('faker');

const topic = 'arn:aws:sns:us-west-2:114421735820:pickup';

let entry = {
  store: 'Floral',
  orderId: faker.address.zipCode(),
  name: faker.name.findName(),
  address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`,
  // vendorId: 'https://sqs.us-west-2.amazonaws.com/293343196722/flowers-queue'
};



setTimeout(() => {
  const params = {
    TopicArn: topic,
    Message: JSON.stringify(entry),
  };
sns.publish(params).promise().then(data=>{
  console.log(data)
}).catch(console.error)
}, 3000)



//sns-publisher