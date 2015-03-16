'use strict';

/**
 * @ngdoc service
 * @name blackjackApp.player
 * @description
 * # player
 * Service in the blackjackApp.
 */

angular.module('blackjackApp')
  .service('Players', function (Player, Feed) {
    var players = [];
    var queue = 0;
    var maxPlayers = 5;

    /**
     * Update single player with points, bids, and check if player can play again
     * @param  {[type]} player [description]
     * @return {[type]}        [description]
     */
    function updatePlayerState(player) {
      var dealer = players[0];

      if (player.getPoints() <= 21) {
        if (player.getPoints() === 21) {
          Feed.log(player, 'won');
          player.addMoney(player.getBid() * 3);
          player.setDone();
        } else if (player.getPoints() < dealer.getPoints()) {
          Feed.log(player, 'lost');
          player.addMoney(player.getBid() * -1);
          player.reset();
        } else if (player.getPoints() >= dealer.getPoints()) {
          Feed.log(player, 'won');
          player.addMoney(player.getBid() * 2);
          player.reset();
        } else {
          Feed.log(player, 'lost');
          player.addMoney(player.getBid() * -1);
          player.setDone();
        }
      } else {
        Feed.log(player, 'lost');
        player.addMoney(player.getBid() * -1);
        player.setDone();
      }
      return player;
    }

    return {
      /**
       * Adding new player. Auto-decision who is who (dealer/player)
       */
      add: function() {
        /**
         * Max numbber of players
         */
        if(players.length>maxPlayers) {return;}

        var role = players.length?'Player':'Dealer';
        var name = players.length?(role + players.length):role;

        var player = new Player(role, name, 100);
            players.push(player);
      },

      /**
       * Check if we reached max number of players
       * @return {Boolean} [description]
       */
      hasMaxReached: function() {
        return this.getPlayersOnly().length === maxPlayers;
      },

      /**
       * Add to action queue.
       * Each action like hit, stand increases queue to be sure that all active players are ready to play
       */
      addToQueue: function() {
        queue++;
      },

      /**
       * Return number of players already queued.
       * If the number equals getPlayersOnly then we can proceed to next round
       * @return {[type]} [description]
       */
      getQueued: function() {
        return queue;
      },

      /**
       * Update every user with points & bids, and decide if we can play
       * @return {[type]} [description]
       */
      resolveGame: function() {
        var dealer = players[0];
            dealer.cards[dealer.cards.length-1].toggle();

        players.filter(function(player) {
          return player.getRole() === 'Player' && (player.hasDone() === false || player.getPoints() < 21);
        }).map(function(player) {
          return updatePlayerState(player);
        });

        if(this.isValidGame()) {
          if(dealer.getPoints() < 21) {
            dealer.hit();
          }
        }

        queue = 0; // reset queue and waiting for active players to play again
      },

      reset: function() {
        players = [];
      },

      /**
       * Simple check if there is reason to play.
       * Dealer & minimum 1 player have to have less then 21 points.
       * @return {Boolean}
       */
      isValidGame: function() {
        if(!players.length) {return;}

        var dealer = players[0];

        if(dealer.getPoints() < 21 && this.getPlayersOnly().length) {
          return true;
        } else {
          return false;
        }
      },

      /**
       * Return players with Player role only
       * @return {Array}
       */
      getPlayersOnly: function() {
        if(!players.length) {
          return players;
        }

        return players.filter(function(player) {
          return (player.getRole() === 'Player' && (player.hasDone() === false || player.getPoints() < 21));
        });
      },

      /**
       * Return all players (including dealer)
       * @return {Array}
       */
      getAll: function() {
        if(!players.length) {
          return players;
        }

        return players.map(function(player) {
          if(!player.hasDone()) {// && player.getPoints() < 21
            return player;
          }
        });
      }
    };
  });
