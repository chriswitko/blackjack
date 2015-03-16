'use strict';

/**
 * @ngdoc function
 * @name blackjackApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blackjackApp
 */
angular.module('blackjackApp')
  .controller('MainCtrl', function ($scope, Players, Cards, Feed) {
    /**
     * Reset game
     * @return {[type]} [description]
     */
    function init() {
      Feed.reset();
      Feed.log(null, 'Hello there! Have a good time players!');

      Players.reset();

      Cards.init();
    }

    init();

  });
