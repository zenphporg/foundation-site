import type { ComponentMountingOptions } from '@vue/test-utils';
import { mount, VueWrapper } from '@vue/test-utils';
import { vi } from 'vitest';

// Mock DOM APIs globally
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
});

// Mock Inertia.js
vi.mock('@inertiajs/vue3', () => ({
  createInertiaApp: vi.fn(),
  router: {
    visit: vi.fn(),
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    reload: vi.fn(),
    replace: vi.fn(),
    remember: vi.fn(),
    restore: vi.fn(),
  },
  usePage: vi.fn(() => ({
    props: {
      name: 'Test App',
      auth: { user: null },
    },
    url: '/',
    component: 'Test',
    version: '1',
  })),
  useForm: vi.fn(() => ({
    data: {},
    errors: {},
    hasErrors: false,
    processing: false,
    progress: null,
    wasSuccessful: false,
    recentlySuccessful: false,
    transform: vi.fn(),
    defaults: vi.fn(),
    reset: vi.fn(),
    clearErrors: vi.fn(),
    setError: vi.fn(),
    submit: vi.fn(),
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    cancel: vi.fn(),
  })),
  Head: {
    name: 'Head',
    template: '<head><slot /></head>',
  },
  Link: {
    name: 'Link',
    template: '<a><slot /></a>',
  },
}));

// Mock Ziggy
vi.mock('ziggy-js', () => ({
  default: vi.fn((name: string) => `/${name}`),
  route: vi.fn((name: string) => `/${name}`),
}));

// Mock @vueuse/core globally
vi.mock('@vueuse/core', async (importOriginal) => {
  const actual = await importOriginal();
  const { ref, computed } = await import('vue');

  return {
    ...actual,
    useVModel: vi.fn((props, key, emit, options) => {
      const value = ref(options?.defaultValue ?? props[key] ?? false);

      return computed({
        get: () => value.value,
        set: (newValue) => {
          value.value = newValue;
          if (emit) {
            emit(`update:${key}`, newValue);
          }
        },
      });
    }),
    useMediaQuery: vi.fn(() => ref(false)),
    useEventListener: vi.fn(),
    useCookies: vi.fn(() => ({
      get: vi.fn(() => 'true'),
      set: vi.fn(),
    })),
  };
});

// Global test utilities
global.route = vi.fn((name: string) => `/${name}`);

// Mock Vue's computed function globally
import { computed } from 'vue';
global.computed = computed;

// Mock translation function globally
global.__ = vi.fn((key: string) => key);

// Test utility functions
export function mountComponent<T>(component: T, options: ComponentMountingOptions<T> = {}): VueWrapper {
  return mount(component, {
    global: {
      ...options.global,
    },
    ...options,
  });
}

export function createMockProps(overrides = {}) {
  return {
    title: 'Test Component',
    isVisible: true,
    items: [],
    ...overrides,
  };
}

export function createMockUser(overrides = {}) {
  return {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    avatar: null,
    ...overrides,
  };
}

export function createMockPageProps(overrides = {}) {
  return {
    auth: {
      user: createMockUser(),
    },
    ...overrides,
  };
}

export function createMockBreadcrumbs(overrides = []) {
  return [{ title: 'Home', href: '/' }, { title: 'Dashboard', href: '/dashboard' }, ...overrides];
}

export async function triggerAsyncAction(wrapper: VueWrapper, action: () => Promise<void>) {
  await action();
  await wrapper.vm.$nextTick();
}
