const path = require('path')
const webpack = require('webpack')
const createThemeColorReplacerPlugin = require('./config/plugin.config')
const generatorApi = require('./src/autoApi')
generatorApi()

const basePort = {
  production: {
    proxyUser: '7001'
  },
  dev: {
    //有两种形式，如果只需要标明端口号 写法如example
    //example:'8080',
    //如果需要配置rewrite baseUrl 则如exampleObj
    //example: {baseUrl: 'http://localhost',rewrite: '/exampleObj/test',port: '8080'}
    proxyUser: '7001',
  }
}

const BASE_URL = process.env.VUE_APP_API_BASE_URL
const portType = process.env.PORT_TYPE || process.env.NODE_ENV
const portKeys = Object.keys(basePort[portType])
const proxyTable = JSON.parse(`{
${portKeys.map(item => `"^/${item}":
{
  "target":"${!!basePort[portType][item].baseUrl ? basePort[portType][item].baseUrl : BASE_URL}:${!!basePort[portType][item].port ? basePort[portType][item].port : basePort[portType][item]}",
  "changeOrigin":true,
  "pathRewrite":{
    "^/${item}":"${!!basePort[portType][item].rewrite ? '/' + basePort[portType][item].rewrite : ''}"
    }
}`).join(',')}}`)
console.log(proxyTable)

function resolve(dir) {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'


const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
  ]
}

// vue.config.js
const vueConfig = {
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {}
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })

    // if prod is on
    // assets require on cdn
    if (isProd) {
      config.plugin('html').tap(args => {
        args[0].cdn = assetsCDN
        return args
      })
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme

          // 'primary-color': '#F5222D',
          // 'link-color': '#F5222D',
          'border-radius-base': '2px'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    // development server port 8000
    port: 8000,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: proxyTable
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: true,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

module.exports = vueConfig
