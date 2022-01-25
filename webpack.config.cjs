const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SveltePreprocess = require('svelte-preprocess');
const Autoprefixer = require('autoprefixer');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './client/src/index.js',
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              // Dev mode must be enabled for HMR to work!
              dev: true,
            },
            hotReload: true,
            hotOptions: {
              // List of options and defaults: https://www.npmjs.com/package/svelte-loader-hot#usage
              noPreserveState: false,
              optimistic: true,
            },
            preprocess: SveltePreprocess({
              scss: true,
              sass: true,
              postcss: {
                plugins: [
                  Autoprefixer,
                ],
              },
            }),
          },
        },
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'public/'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public/'),
      publicPath: '/dist/',
    },
    proxy: {
      '/memory': 'http://localhost:8080',
    },
    port: 3000,
    hot: true,
  },
  devtool: false,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/client/public/index.html/'),
      favicon: path.join(__dirname, '/client/public/favicon.ico'),
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: ['tone'],
    }),
  ],
};
