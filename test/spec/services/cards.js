'use strict';

describe('Service: Cards', function () {

  // load the service's module
  beforeEach(module('blackjackApp'));

  // instantiate service
  var Cards;
  beforeEach(inject(function (_Cards_) {
    Cards = _Cards_;
  }));

  it('should do something', function () {
    expect(!!Cards).toBe(true);
  });

});
