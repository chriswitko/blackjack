'use strict';

/**
 * @ngdoc directive
 * @name blackjackApp.directive:card
 * @description
 * # card
 */
angular.module('blackjackApp')
  .directive('card', function () {
    return {
      templateUrl: 'scripts/directives/card.html',
      restrict: 'E',
      scope: {
        card: '='
      }
    };
  });
