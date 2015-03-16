'use strict';

/**
 * @ngdoc function
 * @name blackjackApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the blackjackApp
 */
angular.module('blackjackApp')
  .controller('GameCtrl', function ($scope, Players, Feed) {
    $scope.players = [];
    $scope.isReady = false;

    /**
     * Check if there is reason to play and show/hide aler about it.
     * @return {Boolean} [description]
     */
    $scope.isValidGame = function() {
      return Players.isValidGame();
    };

    /**
     * Init new game
     * @return {[type]} [description]
     */
    function init() {
      Feed.log(null, 'Init new game');
      $scope.players = Players.getAll();
    }

    init();
  });
