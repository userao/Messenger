const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5001',
      changeOrigin: true,
    }),
  );
};
