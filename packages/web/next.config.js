// https://github.com/cyrilwanner/next-compose-plugins
const withPlugins = require('next-compose-plugins');

// Tell webpack to compile the "bar" package, necessary if you're using the export statement for example
// https://www.npmjs.com/package/next-transpile-modules
const withTM = require('next-transpile-modules')([
  'bar',
  '@vjcspy/web-chiaki',
  '@vjcspy/chitility',
  '@vjcspy/web-ui',
  '@magento/venia-ui'
]);
const withPWA = require('next-pwa');

module.exports = withPlugins([
  withPWA({
    pwa: {
      disable: process.env.NODE_ENV !== 'production',
      register: false
    }
  }),
  // Vẫn chưa giải thích được tại sao việc thay đổi thứ tự lại gây ra lỗi không import được module
  withTM
]);
