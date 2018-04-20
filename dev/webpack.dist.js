const webpack = require('webpack');
const path = require('path');
const HtmlWebpackAssetPlugin = require('html-asset-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helper = require('./helper');
const cfg = require('../app.config');

const extractCSS = new ExtractTextPlugin({
  filename: 'dragload.css'
});

module.exports = {
  context: path.resolve(__dirname, '../src/'),
  entry: {
    dragload: './index'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    library: 'dragload',
    libraryTarget: 'umd',
    filename: '[name].js'
  },
  plugins: [
    extractCSS
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true, minimize: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        })
      }
    ],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types'
    }
  }
};
