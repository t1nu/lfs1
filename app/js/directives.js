'use strict';

var phonecatDirectives = angular.module('phonecatDirectives', []);

phonecatDirectives.directive('lfsLayout', function() {
  return {
    restrict: 'E',
    link: function(scope, element, attrs, tabsCtrl) {

      function getSvgPoints(arr) {
        console.log('getSvgPoints');
        console.log(arr);
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
      scope.$watchCollection('model.coordinates', function(newNames, oldNames) {
        scope.points = getSvgPoints(newNames);
      });
    },
    templateUrl: 'partials/lfs-layout.html'
  };
});