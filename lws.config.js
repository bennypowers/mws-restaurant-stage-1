module.exports = {
  stack: [
    'lws-basic-auth',
    'lws-body-parser',
    'lws-request-monitor',
    'lws-log',
    // 'lws-cors',
    // 'lws-json',
    'lws-compress',
    'lws-rewrite',
    // 'lws-blacklist',
    // 'lws-conditional-get',
    'lws-mime',
    'lws-range',
    'lws-mock-response',
    // 'lws-spa',
    'lws-static',
    // 'lws-index' ,
  ],
  server: 'http2',
  mocks: 'restaurant-mocks.js',
  logFormat: 'stats'
};
