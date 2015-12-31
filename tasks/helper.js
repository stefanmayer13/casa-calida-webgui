/**
 * @author <a href="mailto:stefanmayer13@gmail.com">Stefan Mayer</a>
 */

const gutil = require('gulp-util');
const eslint = require('gulp-eslint');
const gulp = require('gulp');

module.exports = {
    check() {
        gutil.log('running eslint');
        return gulp.src(['config/**/*.js', 'app/**/*.js', 'tests/**/*.js'])
            .pipe(eslint({
                rulePaths: [
                    '.',
                ]}))
            .pipe(eslint.format());
    },
};
