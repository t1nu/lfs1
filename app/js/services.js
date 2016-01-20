'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Datamodel', ['RestService', '$q',
  function(RestService, $q) {

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

    // var user = {};
    // var model = {      
    //   "coordinates": [],
    //   "sources": []
    // };
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
      "xValue": "120",
      "yValue": "260"
    }, {
      "xValue": "0",
      "yValue": "0"
    }];

    var list = [];

    var getRequestList = function() {
      var deferred = $q.defer();
      var promise = deferred.promise;

      if (list.length == 0) {
        RestService.getRequestList().then(function(response) {
          console.log(response);
          list = response.data;
          deferred.resolve(list);
        });
      }
      else {
        deferred.resolve(list);
      }
      return promise;
    }

    var getRequestById = function(id) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      
      getRequestList().then(function(list) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].request_id == id) {
            deferred.resolve(list[i]);
          }
        }
      }, function(){
        deferred.reject();
      });
      return promise;
    }

    return {
      model: model,
      user: user,
      state: state,
      getRequestList: getRequestList,
      getRequestById: getRequestById
    };
  }
]);