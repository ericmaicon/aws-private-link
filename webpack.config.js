const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

const { isLocal } = slsw.lib.webpack;

const entries = {};

Object.keys(slsw.lib.entries).forEach((key) => {
  entries[key] = ['./source-map-install.js', slsw.lib.entries[key]];
});

module.exports = {
  mode: isLocal ? 'development' : 'production',
  entry: entries,
  devtool: 'inline-source-map',
  target: 'node',
  externals: [nodeExternals(), 'aws-sdk'],
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    alias: {
      '@app': path.resolve(__dirname, 'src/'),
    },
  },
  optimization: {
    minimize: false,
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  node: {
    fs: 'empty', // avoids error messages
  },
};
