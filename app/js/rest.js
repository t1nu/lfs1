'use strict';

angular.module('phonecatServices').factory('RestService', ['$http', function($http) {

    var postRequest = function(request) {
      // var data =
      console.log('post request');
      // console.log(request);
      
      // $http.post('/requestList', request);
          $http({
        url: '/requestList',
        method: "POST",
        data: request
    })
      
      };
    
    var getRequestList = function() {
      return $http.get('/requestList');
    }

    return {
      postRequest: postRequest,
      getRequestList: getRequestList
    };
  }]);