const gulp = require('gulp'),
      eslint = require('gulp-eslint'),
      mocha = require('gulp-mocha'),
      files = ['test/*.js', '!node_modules//**'],
      webpack = require('webpack-stream'),
      babel = require('babel-loader'),
      minifyCss = require('gulp-minify-css'),
      sass = require('gulp-sass'),
      maps = require('gulp-sourcemaps'),
      html = require('html-loader');

gulp.task('lint', function() {
  return gulp.src(files)
    .pipe(eslint({
      extends: 'eslint:recommended', // imports general rules
      ecmaFeatures: {
        'modules': true,       // allows modules
        'blockBindings': true,  // allows const
        'arrowFunctions': true  // allows arrow functions
      },
      'rules': {
        'no-console': 0,       // allows console.logs without throwing err
        'semi': 2,             // requires semi-colons
      },
      envs: [
        'node',
        'mocha'
      ]
    }))
    .pipe(eslint.format());
});

gulp.task('html:dev', () => {
  gulp.src(__dirname + '/app/**/*.html')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('sass:dev', function() {
  gulp.src('./app/scss/**/*.scss')
  .pipe(maps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(minifyCss())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('build/'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./app/scss/**/*.scss', ['sass:dev']);
});

gulp.task('webpack:dev', () => {
  gulp.src(__dirname + '/app/js/*.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', () => {
  gulp.src(__dirname + '/test/test_entry.js')
   .pipe(webpack({
     output: {
       filename: 'test_bundle.js'
     }
   }))
   .pipe(gulp.dest('tests/'));
});

gulp.task('webpack:testDir', () => {
  gulp.src(__dirname + '/tests/tests_client/test_directive_entry.js')
    .pipe(webpack({
      module: {
        loaders: [
          {
            test: /\.html$/,
            loader: 'html'
          }
        ]
      },
      output: {
        filename: 'test_directive_bundle.js'
      }
    }))
    .pipe(gulp.dest('tests/tests_client/'));
});

gulp.task('mocha', function() {
  return gulp.src(['/tests/tests_server/*.js'], { read: false })
    .pipe(mocha());
});

gulp.task('watch', function() {
  gulp.watch(files, ['/build']);
});

gulp.task('build:dev', ['webpack:dev', 'html:dev', 'sass:dev']);
gulp.task('default', ['build:dev', 'watch']);
