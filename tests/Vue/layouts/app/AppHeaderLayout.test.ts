import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppHeaderLayout from '@/layouts/app/AppHeaderLayout.vue';

// Mock the components
vi.mock('@/components/AppShell.vue', () => ({
  default: {
    name: 'AppShell',
    template: '<div data-testid="app-shell" :class="$attrs.class"><slot /></div>',
  },
}));

vi.mock('@/components/AppHeader.vue', () => ({
  default: {
    name: 'AppHeader',
    props: ['breadcrumbs'],
    template: '<header data-testid="app-header" :data-breadcrumbs="JSON.stringify(breadcrumbs)"></header>',
  },
}));

vi.mock('@/components/AppContent.vue', () => ({
  default: {
    name: 'AppContent',
    template: '<main data-testid="app-content"><slot /></main>',
  },
}));

describe('AppHeaderLayout', () => {
  const createWrapper = (props = {}, slots = {}) => {
    return mount(AppHeaderLayout, {
      props,
      slots,
    });
  };

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="app-shell"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="app-header"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="app-content"]').exists()).toBe(true);
  });

  it('applies flex-col class to AppShell', () => {
    const wrapper = createWrapper();
    const shell = wrapper.find('[data-testid="app-shell"]');
    expect(shell.classes()).toContain('flex-col');
  });

  it('passes breadcrumbs prop to AppHeader', () => {
    const breadcrumbs = [
      { title: 'Home', href: '/' },
      { title: 'Dashboard', href: '/dashboard' },
    ];
    const wrapper = createWrapper({ breadcrumbs });
    
    const header = wrapper.find('[data-testid="app-header"]');
    expect(header.attributes('data-breadcrumbs')).toBe(JSON.stringify(breadcrumbs));
  });

  it('uses default empty breadcrumbs when not provided', () => {
    const wrapper = createWrapper();
    
    const header = wrapper.find('[data-testid="app-header"]');
    expect(header.attributes('data-breadcrumbs')).toBe('[]');
  });

  it('renders slot content in AppContent', () => {
    const wrapper = createWrapper({}, {
      default: '<div data-testid="slot-content">Page content</div>',
    });
    
    const content = wrapper.find('[data-testid="app-content"]');
    expect(content.find('[data-testid="slot-content"]').exists()).toBe(true);
    expect(content.text()).toContain('Page content');
  });

  it('maintains correct component hierarchy', () => {
    const wrapper = createWrapper();
    
    const shell = wrapper.find('[data-testid="app-shell"]');
    const header = shell.find('[data-testid="app-header"]');
    const content = shell.find('[data-testid="app-content"]');
    
    expect(header.exists()).toBe(true);
    expect(content.exists()).toBe(true);
  });

  it('handles complex breadcrumbs structure', () => {
    const breadcrumbs = [
      { title: 'Home', href: '/' },
      { title: 'Settings', href: '/settings' },
      { title: 'Profile', href: '/settings/profile' },
    ];
    const wrapper = createWrapper({ breadcrumbs });
    
    const header = wrapper.find('[data-testid="app-header"]');
    const parsedBreadcrumbs = JSON.parse(header.attributes('data-breadcrumbs') || '[]');
    expect(parsedBreadcrumbs).toHaveLength(3);
    expect(parsedBreadcrumbs[0]).toEqual({ title: 'Home', href: '/' });
    expect(parsedBreadcrumbs[2]).toEqual({ title: 'Profile', href: '/settings/profile' });
  });

  it('renders multiple slot elements', () => {
    const wrapper = createWrapper({}, {
      default: `
        <div data-testid="main-content">Main content</div>
        <div data-testid="sidebar">Sidebar content</div>
      `,
    });
    
    const content = wrapper.find('[data-testid="app-content"]');
    expect(content.find('[data-testid="main-content"]').exists()).toBe(true);
    expect(content.find('[data-testid="sidebar"]').exists()).toBe(true);
  });

  it('handles empty slot content gracefully', () => {
    const wrapper = createWrapper();
    const content = wrapper.find('[data-testid="app-content"]');
    expect(content.exists()).toBe(true);
  });
});
