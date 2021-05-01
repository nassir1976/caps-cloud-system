'use strict';


var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });

// Create an SQS service object
// var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
AWS.config.apiVersions = {
  sqs: '2012-11-05',
  // other service API versions
};

 let sqs = new AWS.SQS();

function sendMessage(orderId, name, address, url) {
  var params = {
  
    DelaySeconds: 2,
    MessageBody: JSON.stringify({ status: 'delivered', orderId: orderId, address: address, name: name }),
    QueueUrl: url
  };

  sqs.sendMessage(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log('MESSAGEID:', data.MessageId, "DELIVERED SUCCESSFULY !!");
    }
  });
}


let queueURL = `https://sqs.us-west-2.amazonaws.com/114421735820/packages`;

let params = {
  AttributeNames: [
    "SentTimestamp"
  ],
  MaxNumberOfMessages: 1,
  MessageAttributeNames: [
    "All"
  ],
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0
};

setInterval(() => {
  sqs.receiveMessage(params, function (err, data) {
    if (err) {
      console.log("Receive Error", err);
    } else if (data.Messages) {
      let parsedData = JSON.parse(data.Messages[0].Body);
      console.log(JSON.parse(parsedData.Message));
      let parsedMessage = JSON.parse(parsedData.Message);
      sendMessage(parsedMessage.orderId, parsedMessage.name, parsedMessage.address, parsedMessage.vendorID);
      var deleteParams = {
        QueueUrl: queueURL,
        ReceiptHandle: data.Messages[0].ReceiptHandle
      };
      sqs.deleteMessage(deleteParams, function (err, data) {
        if (err) {
          console.log("Delete Error", err);
        } else {
          console.log("Message Deleted", data);
        }
      });
    }
  });
}, 5000)