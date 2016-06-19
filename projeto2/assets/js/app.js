'use strict';

var myApp = angular.module('app', ['ngRoute']);

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/templates/index.html',
      controller: 'AuthController'
    }).otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    })
  }]);