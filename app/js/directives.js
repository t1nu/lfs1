'use strict';

var phonecatDirectives = angular.module('phonecatDirectives', []);

phonecatDirectives.directive('lfsNavbar', ['$location', 'Datamodel', function($location, Datamodel) {
  return {
    restrict: 'E',
    scope: {
      submitFn: '='
    },
    link: function(scope, element, attrs, tabsCtrl) {
      scope.isNotFirstState = function() {
        return Datamodel.state.isNotFirstState();
      }
      scope.isNotLastState = function() {
        return Datamodel.state.isNotLastState();
      }
      scope.next = function() {
        $location.path('/' + Datamodel.state.nextState());
      }
      scope.back = function() {
        $location.path('/' + Datamodel.state.prevState());
      }
      scope.submit = function() {
        scope.submitFn();
      }
    },
    templateUrl: 'partials/lfs-navbar.html'
  };
}]);

phonecatDirectives.directive('lfsLayout', function() {
  return {
    restrict: 'E',
    scope: {
      datamodel: '='
    },
    link: function(scope, element, attrs, tabsCtrl) {

      function getSvgPoints(arr) {
        scope.xMax = 405;
        scope.yMax = 305;
        var padding = 20;
        var s = "M0 0";
        if (angular.isDefined(arr)) {
          for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            s = s + ' L' + arr[i].xValue + ',' + arr[i].yValue;
            if (item.xValue > scope.xMax) {
              scope.xMax = item.xValue;
            }
            if (item.yValue > scope.yMax) {
              scope.yMax = item.yValue;
            }
          }
        }

        scope.layoutStyle = "width:" + (scope.xMax + padding) + "px;height:" + (scope.yMax + padding) + "px";
        return s;
      }

      scope.layoutStyle = "width:405px;height:305px";
      scope.$watchCollection('datamodel.coordinates', function(newNames, oldNames) {
        scope.points = getSvgPoints(newNames);
      })
    },
    templateUrl: 'partials/lfs-layout.html'
  };
});