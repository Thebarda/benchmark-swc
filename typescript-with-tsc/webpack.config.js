const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    main: './src/index.tsx',
  },
  module: {
    rules: [
      {
        parser: { system: false },
        test: /\.[cm]?(j|t)sx?$/,
      },
      {
        test: /\.tsx?$/,
        include: path.join(__dirname, 'src'),
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              configFile: isDevelopment ? 'tsconfig.dev.json' : 'tsconfig.json',
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    isDevelopment && new ReactRefreshPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './public/index.html',
    }),
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
};
