'use strict';

/**
 * @ngdoc directive
 * @name blackjackApp.directive:player
 * @description
 * # player
 */
angular.module('blackjackApp')
  .directive('player', function () {
    return {
      templateUrl: 'scripts/directives/player.html',
      restrict: 'E',
      scope: {
        player: '='
      },
      controller: function ($scope, Players) {
        /**
         * Check if there is still reason to play
         * @return {Boolean} [description]
         */
        $scope.isValidGame = function() {
          return Players.isValidGame();
        };
      }
    };
  });
