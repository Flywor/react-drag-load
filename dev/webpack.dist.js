const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin({
  filename: 'index.css',
  allChunks: true,
});

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, '../'),
  entry: ['./src/index'],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, '../publish'),
    libraryTarget: 'umd',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.css/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/, // 通过正则匹配js,jsx文件
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: false
            }
          }
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src/'),
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../src/'),
        use: extractCSS.extract({
          use: [
            'css-loader?minimize&modules&&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            'postcss-loader',
            'sass-loader',
          ],
          publicPath: '../',
        }),
      }
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './package.json', to: 'package.json' },
      { from: './README.md', to: 'README.md' },
    ]),
    extractCSS,
  ],
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
