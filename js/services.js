'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Datamodel',
  function() {
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
      user: user
    };
  });