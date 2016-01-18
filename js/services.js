'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Datamodel',
  function() {
    var states = ['phones', 'requestStepLayout', 'requestStepSenderReceiver'];
    var currentState = 0;
    var state = {
      "currentState": 0
    };

    function nextState() {
      if (state.currentState < states.length - 1) {
        state.currentState = state.currentState + 1;
      }
      return states[state.currentState];
    }

    function prevState() {
      if (state.currentState > 0) {
        state.currentState = state.currentState - 1;
      }
      return states[state.currentState];
    }

    var model = {
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

    return {
      model: model,
      user: user,
      states: states,
      state: state,
      currentState: currentState,
      nextState: nextState,
      prevState: prevState
    };
  });