'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone', 'Datamodel',
  function($scope, Phone, Datamodel) {
    $scope.user = {
      "username": "john",
      "email": "john@gmail.com"
    };

    $scope.model = Datamodel.model;

    $scope.onAddCoordinate = function(c) {
      $scope.model.coordinates.push(angular.copy(c));
    }

    $scope.onDelCoordinate = function(c) {
      var index = $scope.model.coordinates.indexOf(c);
      $scope.model.coordinates.splice(index, 1);
    }

    $scope.onDelAllCoordinates = function() {
      $scope.model.coordinates = [];
    }
  }
]);

phonecatControllers.controller('RequestStep1Ctrl', ['$scope', 'Phone', 'Datamodel',
  function($scope, Phone, Datamodel) {
    $scope.model = Datamodel.model;

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
