'use strict';


const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const sns = new AWS.SNS();
const faker = require('faker');
require('dotenv').config();


// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_KEY,
//   region: process.env.REGION,
// });

const topic = 'arn:aws:sns:us-west-2:114421735820:pickup' // pick-up is the topic

class Order{ 
  constructor(){
  this.storeName ='1-206-flower'
  this.orderId = faker.address.zipCode(),
  this.name = faker.name.findName(),
  // this.address= `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`,
  this.vendorID= 'https://sqs.us-west-2.amazonaws.com/114421735820/flower'
  }
}

setInterval(() => {
  const params = {
    
    
    TopicArn: topic,
    Message: JSON.stringify(new Order),
  };
sns.publish(params).promise().then(data=>{
  console.log(data)
}).catch(console.error)
}, 5000)



//sns-publisher