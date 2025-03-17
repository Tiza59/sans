import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: [
      '@nodegui/nodegui',
      '@nativescript/core',
    ],
  },
  build: {
    rollupOptions: {
      external: [
        '@nodegui/nodegui',
        '@nativescript/core',
      ],
    },
  },
  server: {
    fs: {
      strict: false,
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'global': 'window',
  },
});