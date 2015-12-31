/**
 * @author <a href="mailto:stefanmayer13@gmail.com">Stefan Mayer</a>
 */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const gulp = require('gulp');
const gutil = require('gulp-util');

const webpackConfig = require('../webpack.config.js');

module.exports = {
    startDevServer() {
        new WebpackDevServer(webpack(webpackConfig), {
            publicPath: webpackConfig.output.publicPath,
            historyApiFallback: true,
            hot: true,
            proxy: webpackConfig.devServer.proxy
        }).listen(8080, 'localhost', function (err) {
            if (err) {
                return gutil.log(err);
            }
            gutil.log('Listening at localhost:8080');
        });
    }
};
