'use strict';

var util = require('../util');
var Google = function (nemo) {
  this.nemo = nemo;
};

var _searchSomething = function (nemo, text) {
    nemo.view.google.searchBoxWaitVisible().sendKeys(text);
    return nemo.view.google.searchButton().click();
}

Google.prototype.search = function(text) {
    _searchSomething(this.nemo, text)
    return this.nemo.view.google.firstResultWaitVisible();
};

module.exports = Google;