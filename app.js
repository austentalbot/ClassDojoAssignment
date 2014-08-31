var app = angular.module('dojo', []);

app.controller('load', function($http, $scope) {
  $scope.queryDojo = function() {
    $http({
      url: 'http://teach.classdojo.com/api/interviewChallenge',
      method: 'GET'
    }).success(function(data) {
      console.log(data);
    });
  };


});

