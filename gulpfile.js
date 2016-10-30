"use strict";

/**
 * @author <a href="mailto:stefanmayer13@gmail.com">Stefan Mayer</a>
 */

const gulp = require('gulp');
const del = require('del');

require('babel-register');

function getTask(name) {
    return require(`./tasks/${name}`);
}

gulp.task('default', ['devserver']);

// gulp.task('default', ['check', 'sass', 'devserver', 'watch']);

// gulp.task('build', ['clean', 'check', 'sass-production', 'client-prod', 'copy-resources']);

gulp.task('devserver', getTask('client').startDevServer);

gulp.task('watch', () => {
    gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('sass', getTask('sass').sass);
