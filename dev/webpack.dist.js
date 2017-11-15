const webpack = require('webpack');
const path = require('path');
const HtmlWebpackAssetPlugin = require('html-asset-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helper = require('./helper');
const cfg = require('../app.config');

const extractCSS = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash:5].css',
  allChunks: true,
});

module.exports = {
  context: path.resolve(__dirname, '../'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: helper.createCommonEntry(cfg.html),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: './',
    filename: 'js/[name].[chunkhash:5].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
      DEBUG: false,
    }),
    new webpack.LoaderOptionsPlugin({ debug: false, minimize: true }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    ...helper.createHtmlPlugins(cfg.html),
    new HtmlWebpackAssetPlugin(),
    extractCSS,
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/, // 通过正则匹配js,jsx文件
        loader: 'babel-loader',
        exclude: /node_modules/, // 跳过 node_modules 目录
        include: path.resolve(__dirname, '../src'),
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.scss$/,
        exclude: path.resolve(__dirname, '../src/css'),  // 非src/css下的scss开启局部样式模式
        use: extractCSS.extract({
          use: [
            'css-loader?minimize&modules&&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            'postcss-loader',
            'sass-loader',
          ],
          publicPath: '../',
        }),
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../src/css'),
        use: extractCSS.extract({
          use: ['css-loader?minimize', 'postcss-loader', 'sass-loader'],
          publicPath: '../',
        }),
      },
    ],
  },
};
