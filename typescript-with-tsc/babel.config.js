const merge = require('babel-merge');

const configuration = {
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    'jotai/babel/plugin-react-refresh',
  ],
  presets: [
    [
      '@babel/preset-react',
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
  ],
};

const baseConfiguration = {
  env: {
    development: configuration,
    production: configuration,
  },
};

const presets = ['@babel/preset-typescript'];

module.exports = merge(baseConfiguration, {
  env: {
    production: {
      presets,
    },
    development: {
      presets,
    },
    test: {
      presets,
    },
  },
});