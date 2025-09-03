// vue.config.js
module.exports = {
  publicPath: process.env.PUBLIC_PATH || '/',
  chainWebpack: (config) => {
    // your existing compat alias + vue-loader tap
    config.resolve.alias.set('vue', '@vue/compat')
    config.module.rule('vue').use('vue-loader').tap((options) => ({
      ...options,
      compilerOptions: { compatConfig: { MODE: 2 } }
    }))

    // 🔧 Ensure eslint-webpack-plugin uses THIS project's ESLint
    if (config.plugins.has('eslint')) {
      config.plugin('eslint').tap((args) => {
        args[0] = {
          ...(args[0] || {}),
          eslintPath: require.resolve('eslint'), // force ESLint 8.57.0
        }
        // In case something injects the removed option, drop it:
        if (args[0].extensions) delete args[0].extensions
        return args
      })
    }
  }
}

