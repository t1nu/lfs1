'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('HomeCtrl', ['$scope', '$state', 'Datamodel',
  function($scope, $state, Datamodel) {
    $scope.initRequest = function() {
      Datamodel.initRequest();
      $state.go('requestStepUser');
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
      console.log(!$scope.flayout.c1.$error);
      console.log(!$scope.flayout.c2.$error);
      if (!$scope.flayout.c1.$error.min) {
        if (!$scope.flayout.c2.$error.min) {
          c.xValue = c.xValue || 0;
          c.yValue = c.yValue || 0;
          $scope.model.coordinates.push(angular.copy(c));
        }
      }
    }
    
    $scope.disableAddCoordinate = function () {
      if (($scope.flayout.c1.$error.length + $scope.flayout.c2.$error.length) > 0) {
        return true;
      } else {
        return false;
      }
    }
    
    $scope.isValidlayout = function() {
      return $scope.model.coordinates.length > 2;
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
    $scope.isPointOutside = false;
    $scope.isRecPointOutside = false;

    $scope.onAddSource = function(c) {
      if (Datamodel.isInPolygon(c)) {
        $scope.isPointOutside = false;
        $scope.model.sources.push(angular.copy(c));
      } else {
        $scope.isPointOutside = true;
      }
    }
     
    $scope.isValidlayout = function() {
      return true;
    }


    $scope.onDelSource = function(c) {
      var index = $scope.model.sources.indexOf(c);
      $scope.model.sources.splice(index, 1);
    }

    $scope.onSetReceiver = function(c) {
      if (Datamodel.isInPolygon(c)) {
        $scope.isRecPointOutside = false;
        $scope.model.receiver = angular.copy(c);
      } else {
        $scope.isRecPointOutside = true;
      }
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

phonecatControllers.controller('RequestListCtrl', ['$scope', 'Datamodel',
  function($scope, Datamodel) {
    $scope.list = [];
    Datamodel.getRequestList().then(function(list) {
      $scope.list = list;
    });
  }
]);
phonecatControllers.controller('RequestDetailCtrl', ['$scope', '$stateParams', 'Datamodel',
  function($scope, $stateParams, Datamodel) {
    console.log($stateParams.requestId);
    $scope.request = {};
    $scope.requestId = $stateParams.requestId;
    Datamodel.getRequestById($stateParams.requestId).then(function(request) {
      console.log('getRequestById');
      $scope.request = request;
    })
  }
]);
