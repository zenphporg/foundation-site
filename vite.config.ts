import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import path from 'node:path';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      laravel({
        input: ['resources/js/app.ts'],
        ssr: 'resources/js/ssr.ts',
        refresh: true,
      }),
      tailwindcss(),
      vue({
        template: {
          transformAssetUrls: {
            base: null,
            includeAbsolute: false,
          },
        },
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.vue\.[tj]sx?\?vue/, // .vue (vue-loader with experimentalInlineMatchResource enabled)
          /\.md$/, // .md
        ],
        imports: [
          'vue',
          '@vueuse/core',
          {
            '@inertiajs/vue3': ['router', 'useForm', 'usePage', 'usePoll', 'usePrefetch', 'useRemember'],
            '@headlessui/vue': [
              'Menu',
              'MenuButton',
              'MenuItem',
              'MenuItems',
              'Disclosure',
              'DisclosureButton',
              'DisclosurePanel',
              'Dialog',
              'DialogPanel',
              'DialogTitle',
              'TransitionRoot',
              'TransitionChild',
            ],
            'lucide-vue-next': [],
            'radix-vue': [],
            '@/lib/utils': [['default', 'utils']],
          },
        ],
        dirs: ['./resources/js/components', './resources/js/composables', './resources/js/layouts', './resources/js/pages'],
        dts: './resources/js/types/auto-imports.d.ts',
        vueTemplate: true,
        defaultExportByFilename: true,
        injectAtEnd: true,
      }),
    ],
    server: {
      host: env.APP_DOMAIN,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './resources/js'),
        'ziggy-js': path.resolve('vendor/tightenco/ziggy'),
        'zorah-js': path.resolve('vendor/zenphp/zorah/dist/index.js'),
        zorah: path.resolve('vendor/zenphp/zorah/dist/vue.js'),
      },
    },
  };
});
