import '../css/app.css';
import './echo';
import './types/index.d.ts';
import './types/ziggy.js.d.ts';

import { createInertiaApp, Head, Link } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp } from 'vue';
import type { Config } from 'ziggy-js';
import { ZiggyVue } from 'ziggy-js';
import { trans, ZorahVue } from 'zorah-js';
import { Ziggy } from './ziggy.js';
import { Zorah } from './zorah.js';

/// <reference types="vite/client" />

const appName = import.meta.env.VITE_APP_NAME || 'Druid Starter Kit';

// Set window.locale from the HTML lang attribute
if (typeof window !== 'undefined') {
  window.locale = document.documentElement.lang || 'en';
}

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./pages/${name}.vue`, import.meta.glob('./pages/**/*.vue')),
  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) });

    // Add global properties
    app.config.globalProperties.__ = (key: string, replace?: Record<string, any>) => trans(key, replace, Zorah as any);
    app.config.globalProperties.trans = (key: string, replace?: Record<string, any>) => trans(key, replace, Zorah as any);

    app
      .use(plugin)
      .use(ZiggyVue, Ziggy as Config)
      .use(ZorahVue, Zorah)
      .component('Head', Head)
      .component('Link', Link)
      .mount(el);
  },
  progress: {
    color: '#4B5563',
  },
});

initializeTheme();
