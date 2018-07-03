const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// the path(s) that should be cleaned
const pathsToClean = ['dist/judge'];

function resolve(dir) {
  return path.join(__dirname, '../../', dir);
}

// the clean options to use
const cleanOptions = {
  root: resolve(''),
  exclude: [],
  verbose: true,
  dry: false,
};

const webpackConfig = merge(baseWebpackConfig, {
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      exclude: /node_modules/,
      parallel: true,
      uglifyOptions: {
        output: {
          comments: false,
          beautify: false,
        },
        compress: {
          drop_console: true,
        },
      },
    }),
  ],
});

module.exports = webpackConfig;
