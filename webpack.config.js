/**
 * @author <a href="mailto:stefanmayer13@gmail.com">Stefan Mayer</a>
 */

var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './app/index'
    ],
    devtool: 'sourcemap',
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        proxy: {
            '(/api*)': {
                target: 'http://localhost:3000/',
            }
        }
    },
    output: {
        path: __dirname,
        filename: 'bundle.js',
        publicPath: '/app/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader']}
        ]
    }
};
