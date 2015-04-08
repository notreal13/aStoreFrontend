exports.config = {
  // The address of a running selenium server.
  // seleniumAddress: 'http://localhost:4444/wd/hub',

  // Spec patterns are relative to the location of this config.
    // specs: [
    //   'test/e2e/{,*/}*.spec.js'
    // ],
  // Override the timeout for webdriver to 20 seconds.
    allScriptsTimeout: 20000,

  suites: {
    parallel: ['test/e2e/parallel/{,*/}*.spec.js'],
    sequence: ['test/e2e/sequence/{,*/}*.spec.js']
  },


  // multiCapabilities: [{
  //   'browserName': 'firefox'
  // }, {
  //   'browserName': 'chrome'
  // }
  // // , {
  // // 	'browserName': 'internet explorer'
  // // }
  // ],

  // capabilities: {
  //   'browserName': 'chrome'
  // },


  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:8000',

  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 20000
  }
};
