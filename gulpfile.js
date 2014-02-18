var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var cache = require('gulp-cached');
var gzip = require("gulp-gzip");

// browserify + minify + jsx + gzip + cache
gulp.task('scripts', function() {
  gulp.src('src/client.js')
    .pipe(browserify({
      insertGlobals : false,
      debug : !gulpUtil.env.production,
      transform: ['reactify']
    }))
    .pipe(uglify({outSourceMap: false}))
    .pipe(gzip())
    .pipe(cache('clientdotjs'))
    .pipe(gulp.dest('./build/'))
});

// just jsx
gulp.task('copy', function() {
  gulp.src(['src/shared.js', 'src/server.js', 'src/bootstrap.js'])
    .pipe(react())
    .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function () {
  gulp.watch(['src/client.js'], ['scripts']);
  gulp.watch(['src/shared.js', 'src/server.js', 'src/bootstrap.js'], ['copy']);
});

gulp.task('default', ['scripts', 'copy', 'watch']);