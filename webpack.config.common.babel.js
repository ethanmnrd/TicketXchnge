// @flow
import path from 'path';
import webpack from 'webpack';
import dotenv from 'dotenv';
import { WDS_PORT, isProd } from './client/util/config';

dotenv.config();


export default {
  entry: [
    // Starting point of app
    'react-hot-loader/patch',
    './client/src'
  ],
  output: {
    filename: 'js/bundle.js', // name of the bundle to generate
    path: path.resolve(__dirname, 'dist'), // Destination folder
    publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/` // URL
  },
  module: {
    rules: [
      // Tells all .js and .jsx files to go through babel-loader.
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  devtool: 'source-map',
  devServer: {
    // port for dev server
    port: WDS_PORT,
    hot: isProd ? false : true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  plugins: [
    // add the plugin to your plugins array
    new webpack.DefinePlugin({ 'process.env.GOOGLE_API_KEY': JSON.stringify(process.env.GOOGLE_API_KEY) })
  ]
};
