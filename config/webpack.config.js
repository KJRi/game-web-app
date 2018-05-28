const argv = require('yargs').argv
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const project = require('./project.config')
const debug = require('debug')('app:config:webpack')

const __DEV__ = project.globals.__DEV__
const __PROD__ = project.globals.__PROD__
const __TEST__ = project.globals.__TEST__

debug('Creating configuration.')
const config = {
  name    : 'client',
  target  : 'web',
  devtool : project.compiler_devtool,
  resolve : {
    modules: [
      project.paths.client(),
      'node_modules'
    ],
    extensions : ['.js', '.jsx', '.json']
  },
  module : {},
  context: project.paths.client()
}
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = project.paths.client('main.js')

config.entry = {
  app : __DEV__
    ? [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      APP_ENTRY
    ]
    : [APP_ENTRY],
  vendor : project.compiler_vendors
}

// ------------------------------------
// Bundle Output
// ------------------------------------
config.output = {
  filename   : `[name].[${project.compiler_hash_type}].js`,
  path       : project.paths.dist(),
  publicPath : project.compiler_public_path
}

// ------------------------------------
// Externals
// ------------------------------------
config.externals = {}
config.externals['react/lib/ExecutionEnvironment'] = true
config.externals['react/lib/ReactContext'] = true
config.externals['react/addons'] = true

// ------------------------------------
// Plugins
// ------------------------------------
config.plugins = [
  new webpack.DefinePlugin(project.globals),
  new HtmlWebpackPlugin({
    template : project.paths.client('index.html'),
    hash     : false,
    game  : project.paths.public('game.ico'),
    filename : 'index.html',
    inject   : 'body',
    minify   : {
      collapseWhitespace : true
    }
  })
]

// Ensure that the compiler exits on errors during testing so that
// they do not get skipped and misreported.
if (__TEST__ && !argv.watch) {
  config.plugins.push(function () {
    this.plugin('done', function (stats) {
      if (stats.compilation.errors.length) {
        // Pretend no assets were generated. This prevents the tests
        // from running making it clear that there were warnings.
        throw new Error(
          stats.compilation.errors.map(err => err.message || err)
        )
      }
    })
  })
}

if (__DEV__) {
  debug('Enabling plugins for live development (HMR, NoErrors).')
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  )
} else if (__PROD__) {
  debug('Enabling plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap : true,
      compress : {
        unused    : true,
        dead_code : true,
        warnings  : true
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names : ['vendor', 'manifest']
    })
  )
}

// ------------------------------------
// Rules
// ------------------------------------
// JavaScript / JSON
config.module.rules = [{
  test    : /\.(js|jsx)$/,
  exclude : /node_modules/,
  loader  : 'babel-loader',
  options : project.compiler_babel
}]

// ------------------------------------
// Style Rules
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const CSS_LOADER_CONFIG = {
  sourceMap: true,
  minimize: false
}

const CSS_LOADER_MODULES_CONFIG = {
  sourceMap: true,
  minimize: false,
  modules: true,
  importLoaders: 1,
  localIdentName: '[name]__[local]___[hash:base64:5]'
}

const CSS_PATTERN = /\.css$/

config.module.rules.push({
  test    : CSS_PATTERN,
  exclude : /node_modules/,
  use : [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: CSS_LOADER_MODULES_CONFIG
    },
    {
      loader: 'postcss-loader'
    }
  ]
})

config.module.rules.push({
  test    : CSS_PATTERN,
  include : /node_modules/,
  use : [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: CSS_LOADER_CONFIG
    },
    {
      loader: 'postcss-loader'
    }
  ]
})

// Images
// ------------------------------------
config.module.rules.push({
  test    : /\.(png|jpg|gif)$/,
  loader  : 'url-loader',
  options : {
    limit : 8192
  }
})

// Fonts
// ------------------------------------
;[
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['svg', 'image/svg+xml']
].forEach((font) => {
  const extension = font[0]
  const mimetype = font[1]

  config.module.rules.push({
    test    : new RegExp(`\\.${extension}$`),
    loader  : 'url-loader',
    options : {
      name  : 'fonts/[name].[ext]',
      limit : 10000,
      mimetype
    }
  })
})

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  debug('Applying ExtractTextPlugin to CSS rules.')
  config.module.rules.filter((rule) =>
    rule.test.toString() === CSS_PATTERN.toString() &&
      rule.use.find((loader) => loader.loader === 'css-loader')
  ).forEach((rule) => {
    const first = rule.use[0]
    const rest = rule.use.slice(1)
    rule.use = ExtractTextPlugin.extract({
      fallback: first,
      use: rest,
      publicPath: '/dist'
    })
  })

  config.plugins.push(
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks : true
    })
  )
}

module.exports = config
