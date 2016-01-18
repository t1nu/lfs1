'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
  function($resource) {
    return $resource('phones/:phoneId.json', {}, {
      query: {
        method: 'GET',
        params: {
          phoneId: 'phones'
        },
        isArray: true
      }
    });
  }
]);

phonecatServices.factory('Datamodel',
  function() {
    var model = {
      "coordinates": {},
      "sources": []
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
      model: model
    };
  });