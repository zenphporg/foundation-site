import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppSidebarLayout from '@/layouts/app/AppSidebarLayout.vue';

// Mock the components
vi.mock('@/components/AppShell.vue', () => ({
  default: {
    name: 'AppShell',
    props: ['variant'],
    template: '<div data-testid="app-shell" :data-variant="variant"><slot /></div>',
  },
}));

vi.mock('@/components/AppSidebar.vue', () => ({
  default: {
    name: 'AppSidebar',
    template: '<aside data-testid="app-sidebar"></aside>',
  },
}));

vi.mock('@/components/AppContent.vue', () => ({
  default: {
    name: 'AppContent',
    props: ['variant'],
    template: '<main data-testid="app-content" :data-variant="variant"><slot /></main>',
  },
}));

vi.mock('@/components/AppSidebarHeader.vue', () => ({
  default: {
    name: 'AppSidebarHeader',
    props: ['breadcrumbs'],
    template: '<header data-testid="app-sidebar-header" :data-breadcrumbs="JSON.stringify(breadcrumbs)"></header>',
  },
}));

describe('AppSidebarLayout', () => {
  const createWrapper = (props = {}, slots = {}) => {
    return mount(AppSidebarLayout, {
      props,
      slots,
    });
  };

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="app-shell"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="app-sidebar"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="app-content"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="app-sidebar-header"]').exists()).toBe(true);
  });

  it('applies sidebar variant to AppShell', () => {
    const wrapper = createWrapper();
    const shell = wrapper.find('[data-testid="app-shell"]');
    expect(shell.attributes('data-variant')).toBe('sidebar');
  });

  it('applies sidebar variant to AppContent', () => {
    const wrapper = createWrapper();
    const content = wrapper.find('[data-testid="app-content"]');
    expect(content.attributes('data-variant')).toBe('sidebar');
  });

  it('passes breadcrumbs prop to AppSidebarHeader', () => {
    const breadcrumbs = [
      { title: 'Home', href: '/' },
      { title: 'Dashboard', href: '/dashboard' },
    ];
    const wrapper = createWrapper({ breadcrumbs });
    
    const header = wrapper.find('[data-testid="app-sidebar-header"]');
    expect(header.attributes('data-breadcrumbs')).toBe(JSON.stringify(breadcrumbs));
  });

  it('uses default empty breadcrumbs when not provided', () => {
    const wrapper = createWrapper();
    
    const header = wrapper.find('[data-testid="app-sidebar-header"]');
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
    const sidebar = shell.find('[data-testid="app-sidebar"]');
    const content = shell.find('[data-testid="app-content"]');
    const header = content.find('[data-testid="app-sidebar-header"]');
    
    expect(sidebar.exists()).toBe(true);
    expect(content.exists()).toBe(true);
    expect(header.exists()).toBe(true);
  });

  it('handles complex breadcrumbs structure', () => {
    const breadcrumbs = [
      { title: 'Home', href: '/' },
      { title: 'Settings', href: '/settings' },
      { title: 'Profile', href: '/settings/profile' },
    ];
    const wrapper = createWrapper({ breadcrumbs });
    
    const header = wrapper.find('[data-testid="app-sidebar-header"]');
    const parsedBreadcrumbs = JSON.parse(header.attributes('data-breadcrumbs') || '[]');
    expect(parsedBreadcrumbs).toHaveLength(3);
    expect(parsedBreadcrumbs[0]).toEqual({ title: 'Home', href: '/' });
    expect(parsedBreadcrumbs[2]).toEqual({ title: 'Profile', href: '/settings/profile' });
  });

  it('renders multiple slot elements', () => {
    const wrapper = createWrapper({}, {
      default: `
        <div data-testid="main-content">Main content</div>
        <div data-testid="secondary-content">Secondary content</div>
      `,
    });
    
    const content = wrapper.find('[data-testid="app-content"]');
    expect(content.find('[data-testid="main-content"]').exists()).toBe(true);
    expect(content.find('[data-testid="secondary-content"]').exists()).toBe(true);
  });

  it('handles empty slot content gracefully', () => {
    const wrapper = createWrapper();
    const content = wrapper.find('[data-testid="app-content"]');
    expect(content.exists()).toBe(true);
    const header = content.find('[data-testid="app-sidebar-header"]');
    expect(header.exists()).toBe(true);
  });
});
