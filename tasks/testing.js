/**
 * @author <a href="mailto:stefanmayer13@gmail.com">Stefan Mayer</a>
 */

const karma = require('karma').server;

module.exports = {
    karmaTests(done) {
        karma.start({
            configFile: __dirname + '/../karma.conf.js',
            singleRun: true,
        }, done);
    },

    watchkarma(done) {
        karma.start({
            configFile: __dirname + '/../karma.conf.js',
            singleRun: false,
        }, done);
    },
};
