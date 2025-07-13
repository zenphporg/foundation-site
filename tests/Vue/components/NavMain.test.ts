import NavMain from '@/components/NavMain.vue';
import { SidebarProvider } from '@/components/ui/sidebar';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the usePage composable
const mockUsePage = vi.fn();
vi.mock('@inertiajs/vue3', async () => {
  const actual = await vi.importActual('@inertiajs/vue3');
  return {
    ...actual,
    usePage: () => mockUsePage(),
    Link: {
      name: 'Link',
      template: '<a><slot /></a>',
      props: ['href'],
    },
  };
});

// Mock icon component - use markRaw to prevent Vue from making it reactive
const { markRaw } = require('vue');
const MockIcon = markRaw({
  name: 'MockIcon',
  template: '<svg><rect /></svg>',
});

function createWrapper(props = {}, options = {}) {
  const TestComponent = {
    components: { SidebarProvider, NavMain },
    template: `
      <SidebarProvider :default-open="true">
        <NavMain v-bind="props" />
      </SidebarProvider>
    `,
    data() {
      return { props };
    },
  };

  return mount(TestComponent, {
    global: {
      mocks: {
        route: vi.fn((name: string) => `/${name}`),
      },
      ...options.global,
    },
    ...options,
  });
}

describe('NavMain', () => {
  const mockItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: MockIcon,
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: MockIcon,
    },
  ];

  beforeEach(() => {
    mockUsePage.mockReturnValue({
      props: {
        auth: {
          user: {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
          },
        },
      },
      url: '/dashboard',
      component: 'Dashboard',
      version: '1',
    });
  });

  it('renders correctly', () => {
    const wrapper = createWrapper({ items: mockItems });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders sidebar group with correct label', () => {
    const wrapper = createWrapper({ items: mockItems });
    expect(wrapper.text()).toContain('Platform');
  });

  it('renders all navigation items', () => {
    const wrapper = createWrapper({ items: mockItems });
    expect(wrapper.text()).toContain('Dashboard');
    expect(wrapper.text()).toContain('Settings');
  });

  it('renders navigation items with correct structure', () => {
    const wrapper = createWrapper({ items: mockItems });
    const menuItems = wrapper.findAll('[data-slot="sidebar-menu-item"]');
    expect(menuItems.length).toBe(2);
  });

  it('renders icons for navigation items', () => {
    const wrapper = createWrapper({ items: mockItems });
    const icons = wrapper.findAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('applies active state to current page', () => {
    mockUsePage.mockReturnValue({
      props: {
        auth: { user: { id: 1, name: 'Test User', email: 'test@example.com' } },
      },
      url: '/dashboard',
      component: 'Dashboard',
      version: '1',
    });

    const wrapper = createWrapper({ items: mockItems });
    const activeButton = wrapper.find('[data-active="true"]');
    expect(activeButton.exists()).toBe(true);
  });

  it('does not apply active state to non-current pages', () => {
    mockUsePage.mockReturnValue({
      props: {
        auth: { user: { id: 1, name: 'Test User', email: 'test@example.com' } },
      },
      url: '/other-page',
      component: 'OtherPage',
      version: '1',
    });

    const wrapper = createWrapper({ items: mockItems });
    const activeButtons = wrapper.findAll('[data-active="true"]');
    expect(activeButtons.length).toBe(0);
  });

  it('renders with empty items array', () => {
    const wrapper = createWrapper({ items: [] });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Platform');
  });

  it('renders sidebar group with correct classes', () => {
    const wrapper = createWrapper({ items: mockItems });
    const sidebarGroup = wrapper.find('[data-slot="sidebar-group"]');
    expect(sidebarGroup.exists()).toBe(true);
    expect(sidebarGroup.classes()).toContain('px-2');
    expect(sidebarGroup.classes()).toContain('py-0');
  });

  it('renders menu buttons with tooltip attributes', () => {
    const wrapper = createWrapper({ items: mockItems });
    const tooltipTriggers = wrapper.findAll('[data-slot="tooltip-trigger"]');
    expect(tooltipTriggers.length).toBeGreaterThan(0);
  });

  it('renders navigation items with correct text content', () => {
    const wrapper = createWrapper({ items: mockItems });
    expect(wrapper.text()).toContain('Dashboard');
    expect(wrapper.text()).toContain('Settings');
  });

  it('renders component structure correctly', () => {
    const wrapper = createWrapper({ items: mockItems });
    const sidebarMenu = wrapper.find('[data-slot="sidebar-menu"]');
    const sidebarGroupLabel = wrapper.find('[data-slot="sidebar-group-label"]');

    expect(sidebarMenu.exists()).toBe(true);
    expect(sidebarGroupLabel.exists()).toBe(true);
  });
});
