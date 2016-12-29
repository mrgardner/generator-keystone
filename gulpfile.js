'use strict';

var gulp = require('gulp');
var taskListing = require('gulp-task-listing');
var validatePipeline = require('pipeline-validate-js');
var testPipeline = require('pipeline-test-node')({ plugins: {
  mocha: {
    reporter: 'spec'
  },
  istanbul: {
    includeUntested: true,
    reporters: ['text-summary'],
    thresholds: {
      global: 80
    }
  }
}});

var validateConfig = {
  linter: {
    files: [
      '*.js',
      './src/*.js',
      './test/**/*.js'
    ]
  },
  test: {
    files: [
      '*.js',
      './src/*.js',
      './test/**/*.js',
    ]
  }
};



gulp.task('help', taskListing);

gulp.task('lint', function() {
  gulp.src([
    validateConfig.linter.files
  ]).pipe(validatePipeline.validateJS());
});

gulp.task('build', ['lint']);


gulp.task('test', function() {
  return gulp
    .src(validateConfig.test.files)
    .pipe(testPipeline.test());
});

gulp.task('default', ['help']);