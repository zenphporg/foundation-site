import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppLayout from '@/layouts/AppLayout.vue';

// Mock the AppSidebarLayout component
vi.mock('@/layouts/app/AppSidebarLayout.vue', () => ({
  default: {
    name: 'AppSidebarLayout',
    props: ['breadcrumbs'],
    template: '<div data-testid="app-sidebar-layout" :data-breadcrumbs="JSON.stringify(breadcrumbs)"><slot /></div>',
  },
}));

describe('AppLayout', () => {
  const createWrapper = (props = {}, slots = {}) => {
    return mount(AppLayout, {
      props,
      slots,
    });
  };

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="app-sidebar-layout"]').exists()).toBe(true);
  });

  it('passes breadcrumbs prop to AppSidebarLayout', () => {
    const breadcrumbs = [
      { title: 'Home', href: '/' },
      { title: 'Dashboard', href: '/dashboard' },
    ];
    const wrapper = createWrapper({ breadcrumbs });
    
    const sidebarLayout = wrapper.find('[data-testid="app-sidebar-layout"]');
    expect(sidebarLayout.attributes('data-breadcrumbs')).toBe(JSON.stringify(breadcrumbs));
  });

  it('uses default empty breadcrumbs when not provided', () => {
    const wrapper = createWrapper();
    
    const sidebarLayout = wrapper.find('[data-testid="app-sidebar-layout"]');
    expect(sidebarLayout.attributes('data-breadcrumbs')).toBe('[]');
  });

  it('renders slot content', () => {
    const wrapper = createWrapper({}, {
      default: '<div data-testid="slot-content">Page content</div>',
    });
    
    expect(wrapper.find('[data-testid="slot-content"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Page content');
  });

  it('handles complex breadcrumbs structure', () => {
    const breadcrumbs = [
      { title: 'Home', href: '/' },
      { title: 'Settings', href: '/settings' },
      { title: 'Profile', href: '/settings/profile' },
    ];
    const wrapper = createWrapper({ breadcrumbs });
    
    const sidebarLayout = wrapper.find('[data-testid="app-sidebar-layout"]');
    const parsedBreadcrumbs = JSON.parse(sidebarLayout.attributes('data-breadcrumbs') || '[]');
    expect(parsedBreadcrumbs).toHaveLength(3);
    expect(parsedBreadcrumbs[0]).toEqual({ title: 'Home', href: '/' });
    expect(parsedBreadcrumbs[2]).toEqual({ title: 'Profile', href: '/settings/profile' });
  });

  it('renders multiple slot elements', () => {
    const wrapper = createWrapper({}, {
      default: `
        <div data-testid="header">Header content</div>
        <div data-testid="main">Main content</div>
        <div data-testid="footer">Footer content</div>
      `,
    });
    
    expect(wrapper.find('[data-testid="header"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="main"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="footer"]').exists()).toBe(true);
  });

  it('handles empty slot content gracefully', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="app-sidebar-layout"]').exists()).toBe(true);
  });
});
