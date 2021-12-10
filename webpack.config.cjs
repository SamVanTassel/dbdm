const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './client/src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: { 
          presets: ['@babel/env', '@babel/preset-react',],
          plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean)
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public/'),
      publicPath: '/dist/'
    },
    proxy: {
      '/memory': 'http://localhost:8080'
    },
    port: 3000,
    hot: true
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/client/public/index.html/')
    }),
  ]
};