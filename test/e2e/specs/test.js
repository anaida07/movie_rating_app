// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;
    console.log(devServer);

    browser
      .url('http://localhost:8081')
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.btn')
      .expect.element('form').to.not.be.visible
      .end();
  },
};
