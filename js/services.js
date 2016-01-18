'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Datamodel',
  function() {

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

    var model = {
      "roomheight": 344,
      "coordinates": {},
      "sources": []
    };
    var user = {
      "username": "john",
      "email": "john@gmail.com"
    };

    model.coordinates = [{
      "xValue": "0",
      "yValue": "0"
    }, {
      "xValue": "120",
      "yValue": "0"
    }, {
      "xValue": "120",
      "yValue": "60"
    }, {
      "xValue": "220",
      "yValue": "60"
    }, {
      "xValue": "220",
      "yValue": "260"
    }, {
      "xValue": "0",
      "yValue": "260"
    }, {
      "xValue": "0",
      "yValue": "0"
    }];
  
    function submit() {
      console.log('submit!');
    }

    return {
      model: model,
      user: user,
      state: state,
      submit: submit
    };
  });