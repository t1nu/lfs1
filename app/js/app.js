'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatAnimations',

  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices',
  'phonecatDirectives'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/requestStepUser', {
        templateUrl: 'partials/request-step-user.html',
        controller: 'RequestStepUserCtrl'
      }).
      when('/requestStepLayout', {
        templateUrl: 'partials/request-step-layout.html',
        controller: 'RequestStepLayoutCtrl'
      }).
      when('/requestStepSenderReceiver', {
        templateUrl: 'partials/request-step-sender-receiver.html',
        controller: 'RequestStepSenderReceiverCtrl'
      }).
      when('/requestStepConfirm', {
        templateUrl: 'partials/request-step-confirm.html',
        controller: 'RequestStepConfirmCtrl'
      }).
      when('/requestList', {
        templateUrl: 'partials/request-list.html',
        controller: 'RequestListCtrl'
      }).
      when('/requestDetail/:requestId', {
        templateUrl: 'partials/request-detail.html',
        controller: 'RequestDetailCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
