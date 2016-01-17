'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.user = {
      "username": "john",
      "email": "john@gmail.com"
    };

    $scope.model = {
      "coordinates": {}
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

    $scope.test = 1;
    $scope.onAddCoordinate = function(c) {
      $scope.model.coordinates.push(angular.copy(c));
      $scope.test = $scope.test + 1;
      //         $scope.points = getSvgPoints(scope.coordinates);
    }


    $scope.onDelCoordinate = function(c) {
      var index = $scope.model.coordinates.indexOf(c);
      $scope.model.coordinates.splice(index, 1);
      //       $scope.points = $scope.getSvgPoints($scope.coordinates);
    }

    $scope.onDelAllCoordinates = function() {
      $scope.model.coordinates = [];
      //       $scope.points = $scope.getSvgPoints($scope.coordinates);
    }
  }
]);


// phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
//   function($scope, $routeParams, Phone) {
//     $scope.phone = Phone.get({
//       phoneId: $routeParams.phoneId
//     }, function(phone) {
//       $scope.mainImageUrl = phone.images[0];
//     });

//     $scope.setImage = function(imageUrl) {
//       $scope.mainImageUrl = imageUrl;
//     }
//   }
// ]);