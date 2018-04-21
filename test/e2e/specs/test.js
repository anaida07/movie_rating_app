// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;
    console.log(devServer)

    browser
      // .url('http://localhost:8081')
      .url(devServer)
      .waitForElementVisible('#inspire', 9000)
      .assert.elementPresent('.list')
      .assert.elementPresent('.list .side_bar_link')
      .assert.elementPresent('.side_bar_link #home')
      .assert.elementPresent('.side_bar_link #contact')
      .click('#drawer')
      .pause(1000)
      .click('#contact')
      .pause(1000)
      .assert.elementPresent('#inspire .contact')
      .assert.containsText('#inspire .contact h1', 'this is contact')
      .pause(1000)
      .click('#login_btn')
      .pause(1000)
      .assert.elementCount('input', 2)
      .setValue('input#email', 'get.aneeta@gmail.com')
      .setValue('input#password', 'secret')
      .pause(1000)
      .click('#login')
      .pause(1000)
      .click('.swal-button--confirm')
      .pause(1000)
      .assert.containsText('#user_email', 'GET.ANEETA@GMAIL.COM')
      .click('#add_movie_link')
      .pause(2000)
      .assert.elementCount('input', 3)
      .assert.elementCount('textarea', 1)
      .setValue('input#name', 'Avengers: Infinity War')
      .setValue('textarea#description', 'Iron Man, Thor, the Hulk and the rest of the Avengers unite to battle their most powerful enemy yet -- the evil Thanos. On a mission to collect all six Infinity Stones, Thanos plans to use the artifacts to inflict his twisted will on reality.')
      .click('.input-group__selections')
      .pause(1000)
      .click('.list a ')
      .setValue('input#genre', 'Fantasy/Science fiction film')
      .click('#add_movie_btn')
      .pause(1000)
      .click('.swal-button--confirm')
      .pause(1000)
      .click('.headline:nth-child(1)')
      .pause(1000)
      .assert.containsText('#rate_movie', 'Rate this movie')
      .click('#rate_movie')
      .pause(1000)
      .click('.vue-star-rating span:nth-child(3)')
      .pause(1000)
      .click('.swal-button--confirm')
      .pause(1000)
      .click('.swal-button--confirm')
      .pause(1000)
      .click('#logout_btn')
      .end();
  },
};
