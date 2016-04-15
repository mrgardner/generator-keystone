'use strict';

var gulp = require('gulp');
var taskListing = require('gulp-task-listing');
var validatePipeline = require('pipeline-validate-js');

gulp.task('help', taskListing);

gulp.task('lint', function() {
  gulp.src([
    './gulpfile.js'
  ]).pipe(validatePipeline.validateJS());
});

gulp.task('build', ['lint']);

gulp.task('default', ['help']);