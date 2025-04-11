const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util"),
        "url": require.resolve("url"),
        "crypto": require.resolve("crypto-browserify"),
        "assert": require.resolve("assert"),
        "zlib": require.resolve("browserify-zlib"),
        "buffer": require.resolve("buffer/"),
        "process": require.resolve("process/browser")
      }
    }
  }
})
