// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
  devtool: 'eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: '8083',
    inline: true,
    disableHostCheck: true,
    historyApiFallback: true,
  },
});

module.exports = devWebpackConfig;
