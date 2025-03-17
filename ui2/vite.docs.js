import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  plugins: [svelte()],
  root: 'examples',
  base: './',
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
    outDir: '../dist/docs',
    emptyOutDir: true,
    rollupOptions: {
      external: [
        '@nodegui/nodegui',
        '@nativescript/core',
      ],
      input: {
        main: path.resolve(__dirname, 'examples/index.html'),
        button: path.resolve(__dirname, 'examples/button/button.html'),
        buttonSvelte: path.resolve(__dirname, 'examples/button/Button.svelte'),
        div: path.resolve(__dirname, 'examples/div/div.html'),
        form: path.resolve(__dirname, 'examples/form-example/index.html'),
        camera: path.resolve(__dirname, 'examples/camera-subscribe-example/index.html'),
        desktop: path.resolve(__dirname, 'examples/desktop-example/index.html'),
        mobile: path.resolve(__dirname, 'examples/mobile-example/index.html'),
        uiElements: path.resolve(__dirname, 'examples/ui-elements/index.html'),
      },
    },
  },
  server: {
    fs: {
      strict: false,
    },
    open: '/index.html',
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'global': 'window',
  },
});