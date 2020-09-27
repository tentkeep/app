module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/app.scss";'
      }
    }
  },
  devServer: {
    disableHostCheck: true
  }
}
