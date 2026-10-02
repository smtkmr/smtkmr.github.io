import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          class1: path.resolve(__dirname, 'class-1/index.html'),
          class1maths: path.resolve(__dirname, 'class-1/maths/index.html'),
          class2: path.resolve(__dirname, 'class-2/index.html'),
          class3: path.resolve(__dirname, 'class-3/index.html'),
          class4: path.resolve(__dirname, 'class-4/index.html'),
          class5: path.resolve(__dirname, 'class-5/index.html'),
          preschool: path.resolve(__dirname, 'Pre-School/index.html'),
          grammar: path.resolve(__dirname, 'Grammar/index.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
