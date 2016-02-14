'use strict';

/* App Module */

var phonecatApp = angular.module('datePickerApp', [
  'ngRoute',
  'dateCtrl',
  'angularjs-datetime-picker' 
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/first', {
        templateUrl: 'partials/first.html',
        controller: 'firstCtrl'
      }).
      when('/first/:strtDate/:endDate', {
        templateUrl: 'partials/next.html',
        controller: 'nextCtrl'
      }).
      otherwise({
        redirectTo: '/first'
      });
  }]);
