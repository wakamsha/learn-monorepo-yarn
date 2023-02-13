import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  root: resolve(__dirname, './'),
  server: {
    port: 3001,
    open: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@learn-monorepo-yarn/core': resolve(__dirname, '../core/src'),
    },
  },
});
