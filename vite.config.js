import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // ensures output folder is 'dist'
  },
  resolve: {
    alias: {
      '@': '/src', // optional, if you want path aliases
    },
  },
});
