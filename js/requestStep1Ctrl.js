'use strict';

angular.module('phonecatControllers', []).controller('RequestStep1Ctrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.model = {
      "coordinates": {},
      "sources": []
    };
    $scope.model.coordinates = [{
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

    $scope.onAddSource = function(c) {
      $scope.model.sources.push(angular.copy(c));
    }

    $scope.onDelSource = function(c) {
      var index = $scope.model.sources.indexOf(c);
      $scope.model.sources.splice(index, 1);
    }
        
    $scope.onSetReceiver = function(c) {
      $scope.model.receiver = angular.copy(c);
    }

  }
]);
