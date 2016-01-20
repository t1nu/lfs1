'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('HomeCtrl', ['$scope', 'Datamodel',
  function($scope, Datamodel) {
    Datamodel.loadData();
  }
]);

phonecatControllers.controller('RequestStepUserCtrl', ['$scope', 'Datamodel',
  function($scope, Datamodel) {
    $scope.user = Datamodel.user;
  }
]);

phonecatControllers.controller('RequestStepLayoutCtrl', ['$scope', 'Datamodel',
  function($scope, Datamodel) {
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

phonecatControllers.controller('RequestStepSenderReceiverCtrl', ['$scope', 'Datamodel',
  function($scope, Datamodel) {
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

phonecatControllers.controller('RequestStepConfirmCtrl', ['$scope', 'Datamodel', 'RestService',
  function($scope, Datamodel, RestService) {
    $scope.model = Datamodel.model;
    $scope.user = Datamodel.user;

    $scope.request = {
      "user": $scope.user,
      "model": $scope.model
    };

    // $scope.submit = function(){
    console.log('ctrl submit!')
    var request = {
      "request_id": 1001,
      "request_user": $scope.user,
      "model": $scope.model
    };
    RestService.postRequest(request);
    // }
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
    Datamodel.getRequestById($routeParams.requestId).then(function(request){
      $scope.request = request;
      $scope.model = request.model;
      $scope.user = request.request_user;
    })
  }
]);
