'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Datamodel',
  function() {

    var loadData = function() {
      AWS.config.update({
      });

      console.log('loadData');

      AWS.config.update({
        region: "eu-west-1",
        endpoint: "https://dynamodb.eu-west-1.amazonaws.com"
      });

      var docClient = new AWS.DynamoDB.DocumentClient();

      var table = "lfsRequest";

      var requestId = 1000;

      var params = {
        TableName: table,
        Item: {
          "requestId": requestId,
          "info": {
            "plot": "Something happens."
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
    };

    var state = {
      "currentState": 0,
      "states": ['requestStepUser', 'requestStepLayout', 'requestStepSenderReceiver', 'requestStepConfirm'],
      "isNotFirstState": function() {
        return this.currentState > 0;
      },
      "isNotLastState": function() {
        return this.currentState < this.states.length - 1;
      },
      "nextState": function() {
        if (this.isNotLastState()) {
          this.currentState = this.currentState + 1;
        }
        return this.states[this.currentState];
      },
      "prevState": function() {
        if (this.isNotFirstState()) {
          this.currentState = this.currentState - 1;
        }
        return this.states[this.currentState];
      }
    };

    var user = {};
    var model = {      
      "coordinates": [],
      "sources": []
    };
//     var model = {
//       "roomheight": 344,
//       "coordinates": {},
//       "sources": []
//     };
//     var user = {
//       "username": "john",
//       "email": "john@gmail.com"
//     };

//     model.coordinates = [{
//       "xValue": "0",
//       "yValue": "0"
//     }, {
//       "xValue": "120",
//       "yValue": "0"
//     }, {
//       "xValue": "120",
//       "yValue": "60"
//     }, {
//       "xValue": "220",
//       "yValue": "60"
//     }, {
//       "xValue": "220",
//       "yValue": "260"
//     }, {
//       "xValue": "0",
//       "yValue": "260"
//     }, {
//       "xValue": "0",
//       "yValue": "0"
//     }];

    function submit() {
      console.log('submit!');
    }

    return {
      model: model,
      user: user,
      state: state,
      submit: submit,
      loadData: loadData
    };
  });