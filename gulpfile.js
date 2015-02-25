var gulp        = require('gulp');
var browserSync = require('browser-sync');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');

// Static server
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './src'
    }
  });
});

// Compile sass files
gulp.task('sass', function () {
  gulp.src('./src/assets/sass/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({indentedSyntax: true}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/assets/styles'));
});

// Copy css files
gulp.task('css', function () {
  return gulp.src(
    [
      'bower_components/angular-material/angular-material.min.css'
    ]
  )
  .pipe(gulp.dest('./src/assets/styles/'));
});

// Process JS files and return the stream.
gulp.task('js', function () {
  return gulp.src([
      'bower_components/angular/angular.min.js',
      'bower_components/angular-resource/angular-resource.min.js',
      'bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'bower_components/angular-animate/angular-animate.min.js',
      'bower_components/angular-aria/angular-aria.min.js',
      'bower_components/hammerjs/hammer.min.js',
      'bower_components/angular-material/angular-material.min.js',
      'bower_components/lodash/lodash.min.js'
    ])
    // gulp.src('bower_components/**/*.js')
    .pipe(uglify())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./src/lib/'));
});

// Launch BrowserSync and watch JS files
gulp.task('default', ['sass', 'css', 'js', 'browser-sync'], function () {

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  // gulp.watch('src/**/*.js', [browserSync.reload]);
  gulp.watch('./src/assets/sass/*.sass', ['sass', browserSync.reload]);
  gulp.watch('./src/**/*.js', browserSync.reload);
  gulp.watch('./src/**/*.tpl', browserSync.reload);
});
