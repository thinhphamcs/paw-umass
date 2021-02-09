/**
 * Set up a proxy server using http-proxy-middleware
 * This way I can send react front end data to my backend database
 * React: 3000
 * Server: 5050
 * I have to change localhost to [::1] to fix the proxy error
 */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/auth',
        createProxyMiddleware({
            target: 'http://[::1]:5050',
            changeOrigin: true,
        })
    );
};