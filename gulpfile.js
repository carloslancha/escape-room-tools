'use strict';

const electric = require('electric');
const gulp = require('gulp');
var gls = require('gulp-live-server');

electric.registerTasks({
	gulp: gulp
});

gulp.task('run', ['build'], () => {
	var server = gls.new('server/index.js');

	server.start();

	gulp.watch(['src/**/*.css', 'src/**/*.scss', 'src/**/*.js', 'src/**/*.soy'], ['build']);

    gulp.watch('server/**/*.js', function() {
      server.start.bind(server)();
    });
});
