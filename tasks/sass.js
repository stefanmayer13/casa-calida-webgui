/**
 * @author <a href="mailto:stefanmayer13@gmail.com">Stefan Mayer</a>
 */

const gulp = require('gulp');
const gutil = require('gulp-util');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const inlineBase64 = require('gulp-inline-base64');

module.exports = {
    sass() {
        gulp.src('./scss/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(inlineBase64({
                baseDir: './scss/',
                maxSize: 14 * 1024,
                debug: true,
            }))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false,
            }))
            .pipe(sourcemaps.write())
            .on('error', function(err) {
                gutil.log(err.message);
            })
            .pipe(gulp.dest('css'));
    },
};
