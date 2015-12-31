/**
 * @author <a href="mailto:stefanmayer13@gmail.com">Stefan Mayer</a>
 */

var gulp = require('gulp');
var del = require('del');

require('babel-register');

function getTask(name) {
    return require('./tasks/' + name);
}

gulp.task('default', ['check', 'sass', 'devserver', 'watch']);

//gulp.task('build', ['clean', 'check', 'sass-production', 'client-prod', 'copy-resources']);

gulp.task('devserver', getTask('client').startDevServer);

gulp.task('watch', function watch() {
    gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('check', getTask('helper').check);

gulp.task('sass', getTask('sass').sass);

gulp.task('test', getTask('testing').tests);
