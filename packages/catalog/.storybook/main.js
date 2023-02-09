const { resolve } = require('path');

module.exports = {
  stories: [
    {
      directory: '../../app/src',
      titlePrefix: 'app',
    },
    {
      directory: '../../core/src',
      titlePrefix: 'core',
    },
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@learn-monorepo-yarn/core': resolve(__dirname, '../../core/src'),
    };
    return config;
  },
};
