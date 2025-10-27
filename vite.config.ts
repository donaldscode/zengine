import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'Zengine',
      fileName: 'zengine',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [],
    },
  },
});

