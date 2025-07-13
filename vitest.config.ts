import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/Vue/setup.ts'],
    include: ['tests/Vue/**/*.{test,spec}.{js,ts}'],
    exclude: ['tests/e2e/**/*'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['resources/js/**/*.{vue,ts,js}'],
      exclude: ['resources/js/types/**', 'resources/js/ziggy.d.ts', 'resources/js/app.ts', 'resources/js/bootstrap.ts', 'resources/js/ssr.ts'],
      thresholds: {
        global: {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './resources/js'),
      '~': resolve(__dirname, './resources'),
    },
  },
});
