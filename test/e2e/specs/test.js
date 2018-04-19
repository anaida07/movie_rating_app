// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#inspire', 9000)
      .assert.elementPresent('.list')
      .assert.elementPresent('.list .side_bar_link')
      // .assert.containsText('.list .side_bar_link .list__tile #home', 'Home')
      // .assert.containsText('.list .side_bar_link .list__tile #contact', 'Contact')
      // .click('.list .side_bar_link #contact')
      // .assert.elementPresent('#app .contact')
      // .assert.containsText('#app .contact h1', 'this is contact')
      .end();
  },
};
