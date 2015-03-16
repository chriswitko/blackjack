'use strict';

/**
 * @ngdoc service
 * @name blackjackApp.card
 * @description
 * # card
 * Factory in the blackjackApp.
 */
angular.module('blackjackApp')
  .factory('Card', function () {
    /**
     * Card constructor
     * @param {[type]}  number Unique card number from 1 to 52
     * @param {Boolean} isOpen Check if card is visible to player
     */
    function Card(number, isOpen) {
      this.number = number;
      this.isOpen = isOpen;
    }

    /**
     * Switch card visibility
     * @return {[type]} [description]
     */
    Card.prototype.toggle = function () {
      this.isOpen = !this.isOpen;
    };

    /**
     * Return TRUE if card is visible
     * @return {Boolean} [description]
     */
    Card.prototype.isActive = function () {
      return this.isOpen;
    };

    return Card;

  });
