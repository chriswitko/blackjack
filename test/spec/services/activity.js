'use strict';

describe('Service: activity', function () {

  // load the service's module
  beforeEach(module('blackjackApp'));

  // instantiate service
  var activity;
  beforeEach(inject(function (_activity_) {
    activity = _activity_;
  }));

  it('should do something', function () {
    expect(!!activity).toBe(true);
  });

});
