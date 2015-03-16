'use strict';

/**
 * @ngdoc service
 * @name blackjackApp.Cards
 * @description
 * # Cards
 * Service in the blackjackApp.
 */
angular.module('blackjackApp')
  .service('Cards', function (Card) {

    /**
     * Cards - max 52
     * @type {Array}
     */
    var cards = [];

    /**
     * Points per card
     * @type {Array}
     */
    var values = [1, 10, 10, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2];

    /**
     * To make sure that we give unique cards from stack, we increase current position on stack
     * @type {Number}
     */
    var pos = 0;

    /**
     * Simple sum
     * @param {[type]} a [description]
     * @param {[type]} b [description]
     */
    function add(a, b) {
        return a + b;
    }

    /**
     * Seaech for the nearest v by miltile on n
     * @param  {[type]} v [description]
     * @param  {[type]} n [description]
     * @return {[type]}   [description]
     */
    function nearest(v, n) {
      if(v > 0) {
        return Math.ceil(v/n) * n;
      } else if( v < 0) {
        return Math.floor(v/n) * n;
      } else {
        return n;
      }
    }

    /**
     * Increase next position on stack
     * @return {[type]} [description]
     */
    function nextPos() {
      return pos++;
    }

    /**
     * Shuffle card stack
     * @param  {[type]} array [description]
     * @return {[type]}       [description]
     */
    function shuffle(array) {
      var counter = array.length, temp, index;

      // While there are elements in the array
      while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }

      return array;
    }

    return {
      /**
       * Init cards - fill up to 52 elements and then shuffle them
       * @return {[type]} [description]
       */
      init: function() {
        for(var i = 1; i <= 52; i++) {
          cards.push(i);
        }
        cards = shuffle(cards);
      },

      /**
       * Generate first 2 cards user, depends on role we show both or hide one (if dealer)
       * @param  {[type]} role [description]
       * @return {[type]}      [description]
       */
      generate: function(role) {
        var a = new Card(cards[nextPos()], true);
        var b = new Card(cards[nextPos()], (role === 'Player' ? true: false));

        return [a, b];
      },

      /**
       * We generate new card
       * @param  {[type]} role [description]
       * @return {[type]}      [description]
       */
      hit: function(role) {
        var a = new Card(cards[nextPos()], (role === 'Player' ? true: false));
        return [a];
      },

      /**
       * Calc current sum of points
       * @param  {[type]} cards [description]
       * @return {[type]}       [description]
       */
      sum: function(cards) {
        return cards.map(function(card) {
          if(card.isActive()) {return values[(nearest(card.number, 4)/4)-1];}
          else {return 0;}
        }).reduce(add, 0);
      }
    };
  });
