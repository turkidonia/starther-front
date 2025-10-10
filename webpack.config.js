const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  performance: {
    maxAssetSize: 100000000, // Set a higher limit for assets (in bytes)
    maxEntrypointSize: 100000000, // Set a higher limit for entry points (in bytes)
    hints: false // Disable warnings completely
  },
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'src/[name].[fullhash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      },
      {
        test: /\.(c|sa|sc)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      { test: /\.ts$/, use: 'ts-loader' },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // Type de fichiers à gérer
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]', // Option de nommage du fichier en sortie
              outputPath: 'videos/' // Où les fichiers seront placés après compilation
            }
          }
        ]
      },
      {
        test: /\.mp4$/,
        type: 'asset/resource', // Ensures the file is treated as a separate asset
        generator: {
          filename: 'assets/videos/[name][ext]' // Specify output directory for videos
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    host: 'localhost',
    port: 9091,
    open: true,
    hot: true,
    client: {
      logging: 'info',
      overlay: true,
      progress: true,
      webSocketTransport: 'ws'
    },
    webSocketServer: 'ws'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      inject: 'body',
      hash: true
    }),
    new ESLintPlugin({
      extensions: 'js',
      exclude: 'node_modules',
      files: './src/'
    }),
    new Dotenv()
  ]
};
