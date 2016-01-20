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
    // scope: {
    //   datamodel: '&'
    // },
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

phonecatDirectives.directive('lfsCmd', function() {
  return {
    restrict: 'E',
    link: function(scope, element, attrs, tabsCtrl) {

      function getCmd() {
        if (angular.isDefined(scope.request) && angular.isDefined(scope.request.model)) {
          var model = scope.request.model;

          function itemToCoordXY(item) {
            if (angular.isDefined(item)) {
              return (item.xValue / 100) + " " + (item.yValue / 100);
            } else {
              return "";
            }
          }

          function itemToCoord(item) {
            if (angular.isDefined(item)) {
              return itemToCoordXY(item) + " " + (item.zValue / 100);
            } else {
              return "";
            }
          }

          function add(str, item, index, length, itemToCoordFn) {
            str = str + itemToCoordFn(item);
            if (index < length - 1) {
              str = str + "; ";
            }
            return str;
          }

          function getCoordString(list, itemToCoordFn) {
            var res = "";
            if (angular.isDefined(list)) {
              for (var i = 0; i < list.length; i++) {
                res = add(res, list[i], i, list.length, itemToCoordFn);
              }
            }
            return res;
          }

          var points = getCoordString(model.coordinates, itemToCoordXY);
          var height = model.roomheight / 100;
          var receiver = itemToCoord(model.receiver);
          var sources = getCoordString(model.sources, itemToCoord);
          return "LF7('polygon',[" + points + "]," + height + ",[" + receiver + "],[" + sources + "])";
        }
      }
      scope.$watch('request.model', function() {
        scope.cmd = getCmd();
      });
    },
    templateUrl: 'partials/lfs-cmd.html'
  };
});