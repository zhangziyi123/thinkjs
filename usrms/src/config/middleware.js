const path = require('path');
const jwt = require('koa-jwt');
const cors = require('@koa/cors');
const isDev = think.env === 'development';

module.exports = [{
    handle: 'meta',
    options: {
        logRequest: isDev,
        sendResponseTime: isDev
    }
},
    {
        handle: jwt,
        options: {
            cookie: think.config('jwt')['cookie'],
            secret: think.config('jwt')['secret'],
            passthrough: true
        }
    },
    {
        handle: cors,
        options: {}
    },
    {
        handle: 'resource',
        enable: isDev,
        options: {
            root: path.join(think.ROOT_PATH, 'www'),
            publicPath: /^\/(static|favicon\.ico)/
        }
    }, {
        handle: 'trace',
        enable: !think.isCli,
        options: {
            debug: isDev
        }
    }, {
        handle: 'payload',
        options: {
            keepExtensions: true,
            limit: '5mb'
        }
    }, {
        handle: 'router',
        options: {}
    }, 'logic', 'controller'];
//# sourceMappingURL=middleware.js.map