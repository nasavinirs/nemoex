/*global nemo:true, describe:true, it:true */
var Nemo = require('nemo');
var assert = require('assert');
var Google = require('../flow/google');
var util = require('../util');

//instance variables
var nemo, google;

describe('@google@', function () {
  before(function (done) {
    nemo = Nemo(function (err) {
      done = util.checkError(err, done);
      google = new Google(nemo);
      nemo.driver.get(nemo.data.google.baseUrl);

      util.waitForJSReady(nemo).then(util.doneSuccess(done), util.doneError(done));


      nemo.wd.logging.installConsoleHandler();
      nemo.wd.logging.getLogger().setLevel(nemo.wd.logging.Level.ALL);
      nemo.driver.controlFlow().on('uncaughtException', function (err) {
         console.error('err', err);
         throw err;
      });
      done();
    });
  });

  after(function (done) {
    nemo.driver.quit().then(done);
  });

  it('Search for text in Google', function (done) {
    google.search("selenium");
    nemo.view.google.firstResult().getText().then(function (text) {
      assert.equal(text, 'Selenium - Web Browser Automation');
      done();
    }, util.doneError(done));
  });
});