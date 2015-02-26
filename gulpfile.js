var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    concat = require('gulp-concat'),
    deploy = require('gulp-gh-pages');

gulp.task('deploy', function () {
  return gulp.src('./dist/**/*')
    .pipe(deploy());
});

gulp.task('js', function() {
  gulp.src('./app/scripts/*.js')
    .pipe(gulp.dest('./dist/scripts/'))
    .pipe(reload({stream: true}));
});

gulp.task('bower:scripts', function() {
  // can be cleaned up but for sake of time...
  return gulp.src([
    './bower_components/jquery/dist/jquery.min.js',
    './bower_components/angular/angular.min.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./dist/scripts/'))
    .pipe(reload({stream: true}));
});

gulp.task('jade', function() {
  gulp.src('./app/*.jade')
    .pipe(jade({
      pretty: true
    }))

    .pipe(gulp.dest('./dist/'))
    .pipe(reload({stream: true}));
});

gulp.task('sass', function () {
  gulp.src('./app/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(reload({stream: true}));
});

gulp.task('serve', ['sass', 'jade'], function() {
  browserSync({
    server: "./dist/"
  });

  gulp.watch("./app/scss/**/*.scss", ['sass']);
  gulp.watch("./app/*.jade", ['jade']);
  gulp.watch("./app/scripts/main.js", ['js']);
});

gulp.task('default', ['bower:scripts', 'serve']);
