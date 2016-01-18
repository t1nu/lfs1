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
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      when('/requestStepLayout', {
        templateUrl: 'partials/request-step-layout.html',
        controller: 'RequestStepLayoutCtrl'
      }).
      when('/requestStepSenderReceiver', {
        templateUrl: 'partials/request-step-sender-receiver.html',
        controller: 'RequestStepSenderReceiverCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);
