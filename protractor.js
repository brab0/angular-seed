let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
    framework: 'jasmine',
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        browserName: 'chrome'
    },
    specs: ['src/modules/**/spec.js'],
    baseUrl: 'http://localhost:8080',
    jasmineNodeOpts: {
      showColors: true,
      isVerbose : true,
      defaultTimeoutInterval: 30000,
      includeStackTrace : true,
      print: function() {}
   },
   onPrepare: function () {
      jasmine.getEnv().addReporter(new SpecReporter({
         spec: {
            displayStacktrace: true
         }
      }));
   }
}
