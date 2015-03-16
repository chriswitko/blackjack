'use strict';

/**
 * @ngdoc function
 * @name blackjackApp.controller:PlayersCtrl
 * @description
 * # PlayersCtrl
 * Controller of the blackjackApp
 */
angular.module('blackjackApp')
  .controller('PlayersCtrl', function ($scope, Players, Feed) {
    $scope.players = Players.getAll();
    $scope.hasMaxReached = Players.hasMaxReached();

    /**
     * Add new player
     */
    $scope.add = function() {
      Players.add();
      Feed.log($scope.players[$scope.players.length-1], 'joined');

      $scope.hasMaxReached = Players.hasMaxReached();
    };

    /**
     * Init game with dealer and first default user
     * @return {[type]} [description]
     */
    function init() {
      Players.add(); // add dealer
      Feed.log($scope.players[0], 'joined');
      Players.add(); // add first player
      Feed.log($scope.players[1], 'joined');
    }

    init();
  });
