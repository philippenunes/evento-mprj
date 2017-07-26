module.exports = function(config) {

  'use strict';

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [

      /* bower depencencies */           
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/angular-block-ui/dist/angular-block-ui.js',
        'bower_components/angular-spinkit/build/angular-spinkit.min.js',
        'bower_components/angular-file-saver/dist/angular-file-saver.bundle.js',
        'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
        'bower_components/angular-animate/angular-animate.min.js',
  
      /* Angular Mocks */
      'bower_components/angular-mocks/angular-mocks.js',

      /* app source code */
      'app/module.js',
      'app/app-route.js',      

      'app/components/**/*.js',

      /* test code */
      'test/unit/**/*.spec.js'

    ],

    // list of files to exclude
    exclude: [

    ],   

    stopSpecOnExpectationFailure: false,

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'Chrome'
    ],

    // Which plugins to enable
    plugins: [
      'karma-chrome-launcher',    
      'karma-jasmine'      
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'progress'   
      // 'junit'
    ]
  });
};
