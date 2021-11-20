const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
          {
            loader: 'swc-loader',
            options: {
              jsc: {
                target: 'es3',
                minify: {
                  compress: {
                    unused: true
                  }
                },
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                  dynamicImport: true,
                },
                transform: {
                  react: {
                    // swc-loader will check whether webpack mode is 'development'
                    // and set this automatically starting from 0.1.13. You could also set it yourself.
                    // swc won't enable fast refresh when development is false
                    runtime: 'automatic',
                    refresh: isDevelopment,
                  },
                },
              },
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
