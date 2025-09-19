const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@rimac/shared': path.resolve(__dirname, '../shared/src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            compilerOptions: {
              noEmit: false,
            },
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
              {
                test: /\.(css|scss|sass)$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'postcss-loader',
                  {
                    loader: 'sass-loader',
                    options: {
                      api: 'modern',
                    },
                  },
                ],
              },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        mfHome: 'mfHome@http://localhost:3001/remoteEntry.js',
        mfPlanes: 'mfPlanes@http://localhost:3002/remoteEntry.js',
        mfResumen: 'mfResumen@http://localhost:3003/remoteEntry.js',
      },
              shared: {
                react: {
                  singleton: true,
                  requiredVersion: '^18.2.0',
                  eager: true,
                },
                'react-dom': {
                  singleton: true,
                  requiredVersion: '^18.2.0',
                  eager: true,
                },
                'react-router-dom': {
                  singleton: true,
                  requiredVersion: '^6.20.1',
                  eager: true,
                },
              },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  output: {
    publicPath: 'auto',
    clean: true,
  },
};
