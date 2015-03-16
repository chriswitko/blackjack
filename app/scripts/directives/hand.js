'use strict';

/**
 * @ngdoc directive
 * @name blackjackApp.directive:player
 * @description
 * # player
 */
angular.module('blackjackApp')
  .directive('hand', function (Feed) {
    return {
      templateUrl: 'scripts/directives/hand.html',
      restrict: 'E',
      scope: {
        player: '='
      },
      controller: function ($scope, Players) {
        /**
         * Set new big
         * @param  {[type]} bid    [description]
         * @param  {[type]} player [description]
         * @return {[type]}        [description]
         */
        $scope.bid = function(bid, player) {
          player.setBid(bid);
          Feed.log(player, 'bid £' + bid);
        };

        /**
         * Emit selected action
         * @param  {[type]} action [description]
         * @param  {[type]} player [description]
         * @return {[type]}        [description]
         */
        $scope.action = function(action, player) {
          /**
           * Disable if already action selected
           */
          if(player.getAction()) {return;}

          if(action === 'hit') {
            player.hit();
            Players.addToQueue();
            Feed.log(player, 'pressed Hit');
          }

          if(action === 'stand') {
            Players.addToQueue();
            Feed.log(player, 'pressed Stand');
          }

          if(Players.getQueued()===(Players.getPlayersOnly().length)) { // minus dealer
            Players.resolveGame();
          }
        };
      }
    };
  });
