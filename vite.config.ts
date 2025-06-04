import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
// import { oxygen } from '@shopify/mini-oxygen/vite';
import {reactRouter} from '@react-router/dev/vite';
import {cloudflare} from '@cloudflare/vite-plugin';

import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import {resolve} from 'path';
// import netlifyPlugin from '@netlify/vite-plugin-react-router'

export default defineConfig({
  plugins: [
    cloudflare({viteEnvironment: {name: 'ssr'}}),
    tailwindcss(),
    hydrogen(),
    reactRouter(),
    tsconfigPaths(),
  ],
  build: {
    // Allow a strict Content-Security-Policy
    // without inlining assets as base64:
    assetsInlineLimit: 0,
  },
  ssr: {
    optimizeDeps: {
      /**
       * Include dependencies here if they throw CJS<>ESM errors.
       * For example, for the following error:
       *
       * > ReferenceError: module is not defined
       * >   at /Users/.../node_modules/example-dep/index.js:1:1
       *
       * Include 'example-dep' in the array below.
       * @see https://vitejs.dev/config/dep-optimization-options
       */
      include: [
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'react',
        'react-dom',
        'react-dom/server',
        'konva',
      ],
    },
  },
  resolve: {
    alias: {
      canvas: resolve('./utils/canvas-mock.js'),
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development',
    ),
    global: 'globalThis',
  },
});
