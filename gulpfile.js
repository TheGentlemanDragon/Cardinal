var gulp        = require('gulp');
var browserSync = require('browser-sync');
var concat      = require('gulp-concat');
var uncss       = require('gulp-uncss');
var uglify      = require('gulp-uglify');
var stylus      = require('gulp-stylus');
var sourcemaps  = require('gulp-sourcemaps');

// Static server
gulp.task('serve', function() {
  var config = {
    server: {
      baseDir: './src'
    },
    files: [
      './src/**/*.js',
      './src/**/*.html'
    ],
    notify: false,
    injectChanges: false
  };

  browserSync(config);
});

// Concatenate vendor js
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
    .pipe(gulp.dest('./src/assets/js/'));
});

// Copy css files
gulp.task('css', function () {
  return gulp.src(
      [ './node_modules/angular-material/angular-material.min.css' ]
    )
    .pipe(gulp.dest('./src/assets/styles/'));
});

// // Strip unused CSS
// gulp.task('uncss', function() {
//   return gulp.src('./node_modules/angular-material/angular-material.min.css')
//     .pipe(uncss({
//       html: ['./src/**/*.html']
//     }))
//     .pipe(gulp.dest('./src/assets/styles/'));
// });

// Compile stylus files
gulp.task('stylus', function () {
  return gulp.src('./src/assets/stylus/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/assets/styles'));
});

// Reload on changes
gulp.task('watch', function () {
  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  gulp.watch('./src/assets/stylus/app.styl', ['stylus', browserSync.reload]);
  // gulp.watch('./src/**/*.html', ['uncss', 'stylus', browserSync.reload]);
  // gulp.watch('./src/**/*.html', [browserSync.reload]);
});

gulp.task('default', ['stylus', 'serve', 'watch']);
