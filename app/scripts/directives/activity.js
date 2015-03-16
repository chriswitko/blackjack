'use strict';

/**
 * @ngdoc directive
 * @name blackjackApp.directive:activity
 * @description
 * # activity
 */
angular.module('blackjackApp')
  .directive('activity', function () {
    return {
      templateUrl: 'scripts/directives/activity.html',
      restrict: 'E',
      controller: function ($scope, Feed) {
        $scope.activities = Feed.get();
      }
    };
  });
