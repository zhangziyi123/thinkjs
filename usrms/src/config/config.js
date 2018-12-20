// default config
module.exports = {
    workers: 1,
    route_on: true, // 开启自定义路由
    jwt: {
        secret: 'thinjs_jwt_token', // 因为这三个参数在不同的位置会用到，为了统一管理我们提取到了公共的 config 中
        cookie: 'jwt-token',
        expire: 7 * 24 * 3600 // 秒
    }
};
// # sourceMappingURL=config.js.map
