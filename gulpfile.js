'use strict';

var gulp = require('gulp');
var taskListing = require('gulp-task-listing');
var validatePipeline = require('pipeline-validate-js');
var testPipeline = require('pipeline-test-node');
var config = {
  files: {
    src: [
      './test/**/*.js'
    ]
  },
  plugins: {
    istanbul: {
      writeReports: {
        reporters: ['html'],
      },
      thresholds: {
        global: 80
      }
    }
  }
};

var validateConfig = {
  linter: {
    files: [
      './src/**/*.js'
    ]
  },
  test: {
    files: [
      './test/**/*.js'
    ]
  }
};

gulp.task('help', taskListing);

gulp.task('lint', function() {
  gulp.src(validateConfig.linter.files)
    .pipe(validatePipeline.validateJS());
});

gulp.task('build', ['lint']);


gulp.task('test', function() {
  return gulp
    .src(validateConfig.test.files)
    .pipe(testPipeline.test(config));
});

gulp.task('default', ['help']);