const webpack = require('webpack');
const path = require('path');

module.exports = env => {
  const config = {
    module: {
      loaders: [
        {
          rules: [
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            },
            {
              test: /\.scss$/,
              use: ["style-loader", "css-loader", "sass-loader"]
            }
          ]
        },
        {
          loader: "babel-loader",
          include: [
            path.join(__dirname, "/src/"),
            path.join(__dirname, "/test-app/"),
          ],
          test: /\.jsx?$/,
          query: {
            presets: ['es2015', 'react']
          }
        },
      ]
    }
  }
  if (env.development) {
    config.entry = {
      bundle: path.join(__dirname, '/test-app/index.js')
    }
    config.output = {
      filename: '[name].js',
      path: path.join(__dirname, '/test-app/')
    }
    config.devtool = 'inline-source-map'
    config.devServer = {
      contentBase: './test-app/',
      port: env.PORT || 3000
    }
    config.module.loaders.push({
      test: /\.jsx?$/,
      enforce: 'pre',
      loader: 'eslint-loader',
      include: path.join(__dirname, 'src'),
      options: {
        emitWarning: true,
      }
    })
  }
  if (env.production) {
    config.entry = {
      DsForm: path.join(__dirname, '/src/DsForm.js')
    }
    config.output = {
      filename: '[name].js',
      path: path.join(__dirname, '/build/'),
      library: 'DsForm',
      libraryTarget: 'umd'
    }
    config.plugins = [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.AggressiveMergingPlugin()
    ]
  }
  return config
}