'use strict';

/**
 * @ngdoc directive
 * @name blackjackApp.directive:header
 * @description
 * # header
 */
angular.module('blackjackApp')
  .directive('header', function () {
    return {
      templateUrl: 'scripts/directives/header.html',
      restrict: 'E'
    };
  });
