var 
    gulp            = require('gulp'),
    proxy           = require('proxy-middleware'),
    browserSync     = require('browser-sync').create(),
    url             = require('url'),
    Server = require('karma').Server;

var basePaths = {
  src: 'app/',
  dest: 'dist/',
  tmp: 'tmp/'  
};

  gulp.task('test', function(done) {
    new Server({
      configFile: __dirname + '/test/karma.conf.js',
      singleRun: true
    }, done).start();
  });

  gulp.task('tdd', function(done) {
    new Server({
      configFile: __dirname + '/test/karma.conf.js'
    }, done).start();
  });

gulp.task('change-src', function () {
  browserSync.reload();
});

gulp.task('serve', [], function () {

  var proxyOptions = url.parse('http://localhost:8080/sample/api');
  proxyOptions.route = '/sample/api';

  var jsfiles = basePaths.src + '/**/*.*';

  browserSync.init({
    port: 9000,
    serveStatic:[{
      route:['/bower_components'],
      dir:'bower_components'
    }],
  server: {
      baseDir: basePaths.src,
      middleware: [proxy(proxyOptions)]
    },
    files:[jsfiles, basePaths.src + '/index.html']
  });

  gulp.watch(basePaths.src, ['change-src']);
});