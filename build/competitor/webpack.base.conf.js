const path = require('path');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const templatePath = path.resolve(__dirname, '../../src/template/competitor');

function resolve(dir) {
  return path.join(__dirname, '../../', dir);
}

module.exports = {
  entry: {
    main: resolve('src/entry/competitor_entry.js'),
    vendor: ['vue', 'vue-router', 'jquery'],
  },
  output: {
    path: resolve('dist/competitor'),
    filename: 'js/[name]-[hash].bundle.js',
  },
  resolve: {
    extensions: ['*', '.vue', '.js', '.css', '.json', '.png', '.gif', '.jpg'],
    alias: {
      '@': resolve('src'),
      vue$: 'vue/dist/vue.esm.js',
      Lib: resolve('lib'),
      Views: resolve('src/views'),
      Components: resolve('src/components'),
      JSCommon: resolve('src/js'),
      Images: resolve('src/images'),
      Css: resolve('src/css'),
      NodeModules: resolve('node_modules'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader?limit=50000&name=images/[hash:8].[name].[ext]',
      },
      {
        test: /\.(eot|ttf)$/,
        loader: 'file-loader?name=fonts/[hash:8].[name].[ext]',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${templatePath}/index.html`,
      chunks: ['vendor', 'main'],
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
    }),
  ],
};
