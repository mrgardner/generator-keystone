'use strict';

var gulp = require('gulp');
var validatePipeline = require('pipeline-validate-js');

gulp.task('lint', function() {
  gulp.src([
    './gulpfile.js'
  ]).pipe(validatePipeline.validateJS());
});

gulp.task('build', ['lint']);