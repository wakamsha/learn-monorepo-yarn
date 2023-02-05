import linaria from '@linaria/rollup';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import { defineConfig, splitVendorChunkPlugin, type UserConfig } from 'vite';

const __dirname = dirname(new URL(import.meta.url).pathname);

export default defineConfig(({ mode }): UserConfig => {
  console.info({ mode });

  const alias = {
    '@learn-storybook2/core': resolve(__dirname, '../core/src'),
  };

  return {
    root: resolve(__dirname, './'),
    build: {
      sourcemap: true,
    },
    server: {
      port: 3000,
      host: true,
      open: true,
    },
    resolve: {
      alias,
    },
    plugins: [
      splitVendorChunkPlugin(),
      react({
        babel: {
          parserOpts: {
            plugins: ['decorators-legacy', 'classProperties'],
          },
        },
      }),
      linaria({
        sourceMap: true,
        babelOptions: {
          plugins: [
            // linaria にエイリアスパスを認識させるための措置。
            [
              'module-resolver',
              {
                alias,
              },
            ],
          ],
          // パースエラー回避のための措置。
          // linaria でのスタイル定義内に何かしら型情報が入り込む場合はこの設定が必要となる。
          presets: ['@babel/preset-typescript'],
        },
      }),
    ],
  };
});
