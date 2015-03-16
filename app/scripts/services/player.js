'use strict';

/**
 * @ngdoc service
 * @name blackjackApp.user
 * @description
 * # user
 * Service in the blackjackApp.
 */
angular.module('blackjackApp')
  .factory('Player', function (Cards) {
    /**
     * Player constructor
     * @param {[type]}  role    Dealer, Player - there can be only one dealer (added automatically)
     * @param {[type]}  name    Player name - default Player1 etc.
     * @param {[type]}  wallet  Wallet amount - default 100
     */
    function Player(role, name, wallet) {
      this.role = role;
      this.name = name;
      this.wallet = wallet;
      this.action = null;
      this.bid = 0;
      this.cards = Cards.generate(this.role);
      this.points = Cards.sum(this.cards);
      this.isDone = false;
    }

    /**
     * Return role
     * @return {[type]} [description]
     */
    Player.prototype.getRole = function () {
      return this.role;
    };

    /**
     * Return name
     * @return {[type]} [description]
     */
    Player.prototype.getName = function () {
      return this.name;
    };

    /**
     * Return current bid
     * @return {[type]} [description]
     */
    Player.prototype.getBid = function () {
      return this.bid;
    };

    /**
     * Return current action (hit, stand)
     * @return {[type]} [description]
     */
    Player.prototype.getAction = function () {
      return this.action;
    };

    /**
     * Get current wallet amount
     * @return {[type]} [description]
     */
    Player.prototype.getWallet = function () {
      return this.wallet;
    };

    /**
     * Get current points
     * @return {[type]} [description]
     */
    Player.prototype.getPoints = function () {
      return this.points;
    };

    /**
     * Check if player ended its game
     * @return {Boolean} [description]
     */
    Player.prototype.hasDone = function () {
      return this.isDone;
    };

    /**
     * End game for player
     */
    Player.prototype.setDone = function () {
      this.isDone = true;
    };

    /**
     * Set new bid
     * @param {[type]} bid [description]
     */
    Player.prototype.setBid = function (bid) {
      this.bid = bid;
    };

    /**
     * Reset player meta to give another chance to play
     * @return {[type]} [description]
     */
    Player.prototype.reset = function() {
      this.setBid(0);
      this.setAction(null);
    };

    /**
     * Allows increase bid
     * @param {[type]} bid [description]
     */
    Player.prototype.addMoney = function(bid) {
      this.wallet += bid;
    };

    /**
     * Set new action
     * @param {[type]} action [description]
     */
    Player.prototype.setAction = function(action) {
      this.action = action;
    };

    /**
     * Hit
     * Generate new card for player
     * @return {[type]} [description]
     */
    Player.prototype.hit = function () {
      this.action = 'hit';
      this.cards = this.cards.concat(Cards.hit(this.role));
      this.points = Cards.sum(this.cards);
    };

    /**
     * Stand
     * Wait the queue
     * @return {[type]} [description]
     */
    Player.prototype.stand = function () {
      this.action = 'stand';
    };

    /**
     * Split
     * Add second hand - this is not ready
     * @return {[type]} [description]
     */
    Player.prototype.split = function () {
      this.action = 'split';
    };

    return Player;
  });
