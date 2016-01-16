'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';

    $scope.user = {
      "username": "john",
      "email": "john@gmail.com"
    };
     
    $scope.getSvgPoints = function(arr) {
      var s ="M10 10";
      for(var i=0; i < arr.length; i++) {
        s = s + ' L' + arr[i].xValue + ',' + arr[i].yValue;
      }
      return s;
    }

    $scope.coordinates = [{
      "xValue": "10",
      "yValue": "10"
    }, {
      "xValue": "120",
      "yValue": "10"
    }, {
      "xValue": "120",
      "yValue": "60"
    }, {
      "xValue": "220",
      "yValue": "60"
    }];
    $scope.points = $scope.getSvgPoints($scope.coordinates);
    $scope.onAddCoordinate = function(c) {
      $scope.coordinates.push(angular.copy(c));
      $scope.points = $scope.getSvgPoints($scope.coordinates); 
//       "200,10 250,190 160,210 100,100";
    }
  }
]);


phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({
      phoneId: $routeParams.phoneId
    }, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }
]);