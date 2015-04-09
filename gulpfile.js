var gulp        = require('gulp');
var browserSync = require('browser-sync');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var stylus      = require('gulp-stylus');
var sourcemaps  = require('gulp-sourcemaps');

// Static server
gulp.task('browser-sync', function() {
  var config = {
    server: {
      baseDir: './src'
    },
    files: [
      './src/**/*.js',
      './src/**/*.tpl'
    ],
    notify: false,
    injectChanges: false    
  };

  browserSync(config);
});

// Compile stylus files
gulp.task('stylus', function () {
  gulp.src('./src/assets/stylus/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/assets/styles'));
});

// Copy css files
gulp.task('css', function () {
  return gulp.src(
    [
      'node_modules/angular-material/angular-material.min.css'
    ]
  )
  .pipe(gulp.dest('./src/assets/styles/'));
});

// Process JS files and return the stream.
gulp.task('js', function () {
  return gulp.src([
      'node_modules/angular/angular.min.js',
      'node_modules/angular-animate/angular-animate.min.js',
      'node_modules/angular-aria/angular-aria.min.js',
      'node_modules/angular-material/angular-material.min.js',
      'node_modules/angular-resource/angular-resource.min.js',
      'node_modules/angular-ui-router/release/angular-ui-router.min.js',
      'node_modules/lodash/index.js'
    ])
    // gulp.src('node_modules/**/*.js')
    .pipe(uglify())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./src/lib/'));
});

// Launch BrowserSync and watch JS files
gulp.task('default', ['stylus', 'css', 'js', 'browser-sync'], function () {

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  // gulp.watch('src/**/*.js', [browserSync.reload]);
  gulp.watch('./src/assets/stylus/*.styl', ['stylus', browserSync.reload]);
  // gulp.watch('./src/**/*.js', browserSync.reload);
  // gulp.watch('./src/**/*.tpl', browserSync.reload);
});
