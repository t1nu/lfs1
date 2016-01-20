'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('HomeCtrl', ['$scope', '$location', 'Datamodel',
  function($scope, $location, Datamodel) {
    $scope.initRequest = function() {
      Datamodel.initRequest();
      $location.path('/requestStepUser');
    }
  }
]);

phonecatControllers.controller('RequestStepUserCtrl', ['$scope', 'Datamodel',
  function($scope, Datamodel) {
    $scope.user = Datamodel.request.user;
  }
]);

phonecatControllers.controller('RequestStepLayoutCtrl', ['$scope', 'Datamodel',
  function($scope, Datamodel) {
    $scope.model = Datamodel.request.model;

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

phonecatControllers.controller('RequestStepSenderReceiverCtrl', ['$scope', 'Datamodel',
  function($scope, Datamodel) {
    $scope.model = Datamodel.request.model;

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

phonecatControllers.controller('RequestStepConfirmCtrl', ['$scope', '$location', 'Datamodel', 'RestService',
  function($scope, $location, Datamodel, RestService) {
    $scope.model = Datamodel.request.model;
    $scope.user = Datamodel.request.user;
    $scope.request = Datamodel.request;

    $scope.submit = function() {
      console.log('ctrl submit!');
      var httpRequest = {
        "request_user": $scope.user,
        "model": $scope.model
      };
      RestService.postRequest(httpRequest).then(function() {
        $location.path('/home');
      });
    }
  }
]);

phonecatControllers.controller('RequestListCtrl', ['$scope', '$routeParams', 'Datamodel',
  function($scope, $routeParams, Datamodel) {
    $scope.list = [];
    Datamodel.getRequestList().then(function(list) {
      $scope.list = list;
    });
  }
]);
phonecatControllers.controller('RequestDetailCtrl', ['$scope', '$routeParams', 'Datamodel',
  function($scope, $routeParams, Datamodel) {
    console.log($routeParams.requestId);
    $scope.request = {};
    $scope.requestId = $routeParams.requestId;
    Datamodel.getRequestById($routeParams.requestId).then(function(request) {
      console.log('getRequestById');
      $scope.request = request;
    })
  }
]);
