'use strict';

/**
 * @ngdoc service
 * @name blackjackApp.activity
 * @description Collect information about players activities
 * # activity
 * Service in the blackjackApp.
 */
angular.module('blackjackApp')
  .service('Feed', function () {
    var history = [];

    return {
      /**
       * Get all feed
       * @return {[type]} [description]
       */
      get: function() {
        return history;
      },

      /**
       * Save log entry
       * @param  {[type]} player [description]
       * @param  {[type]} title  [description]
       * @return {[type]}        [description]
       */
      log: function(player, title) {
        history.push({player:player, title: title, createdAt: new Date()});
      },

      /**
       * Reset history
       * @return {[type]} [description]
       */
      reset: function() {
        history = [];
      }
    };
  });
