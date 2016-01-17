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
      $scope.xMax = 405;
      $scope.yMax = 305;
      var padding = 20;
      var s = "M0 0";
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        s = s + ' L' + arr[i].xValue + ',' + arr[i].yValue;
        if (item.xValue > $scope.xMax) {
          $scope.xMax = item.xValue;
        }
        if (item.yValue > $scope.yMax) {
          $scope.yMax = item.yValue;
        }
      }

      $scope.layoutStyle = "width:" + ($scope.xMax + padding) +"px;height:" + ($scope.yMax + padding) + "px";
      return s;
    }

    $scope.coordinates = [{
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
    $scope.layoutStyle = "width:405px;height:305px";
    $scope.points = $scope.getSvgPoints($scope.coordinates);
    $scope.onAddCoordinate = function(c) {
      $scope.coordinates.push(angular.copy(c));
      $scope.points = $scope.getSvgPoints($scope.coordinates);
    }

    $scope.onDelCoordinate = function(c) {

      var index = $scope.coordinates.indexOf(c);
      $scope.coordinates.splice(index, 1);
      $scope.points = $scope.getSvgPoints($scope.coordinates);
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