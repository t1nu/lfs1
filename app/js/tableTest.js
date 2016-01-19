var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-central-1",
  endpoint: "http://arn:aws:dynamodb:eu-central-1:490584225730:table/lfsRequest"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "lfsRequest";

var requestId = 1000;

var params = {
    TableName:table,
    Item:{
        "requestId": requestId,
        "info":{
            "plot":"Something happens."
        }
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});