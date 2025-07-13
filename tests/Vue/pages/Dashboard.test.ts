import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Dashboard from '@/pages/Dashboard.vue';

// Mock Inertia
vi.mock('@inertiajs/vue3', () => ({
  Head: {
    name: 'Head',
    props: ['title'],
    template: '<head data-testid="head" :data-title="title"></head>',
  },
}));

// Mock components
vi.mock('@/layouts/AppLayout.vue', () => ({
  default: {
    name: 'AppLayout',
    props: ['breadcrumbs'],
    template: '<div data-testid="app-layout" :data-breadcrumbs="JSON.stringify(breadcrumbs)"><slot /></div>',
  },
}));

vi.mock('@/components/PlaceholderPattern.vue', () => ({
  default: {
    name: 'PlaceholderPattern',
    template: '<div data-testid="placeholder-pattern"></div>',
  },
}));

describe('Dashboard', () => {
  const createWrapper = () => {
    return mount(Dashboard);
  };

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="app-layout"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="head"]').exists()).toBe(true);
  });

  it('sets correct page title', () => {
    const wrapper = createWrapper();
    const head = wrapper.find('[data-testid="head"]');
    expect(head.attributes('data-title')).toBe('Dashboard');
  });

  it('passes correct breadcrumbs to AppLayout', () => {
    const wrapper = createWrapper();
    const appLayout = wrapper.find('[data-testid="app-layout"]');
    const breadcrumbs = JSON.parse(appLayout.attributes('data-breadcrumbs') || '[]');
    
    expect(breadcrumbs).toHaveLength(1);
    expect(breadcrumbs[0]).toEqual({
      title: 'Dashboard',
      href: '/dashboard',
    });
  });

  it('renders four PlaceholderPattern components', () => {
    const wrapper = createWrapper();
    const placeholders = wrapper.findAll('[data-testid="placeholder-pattern"]');
    expect(placeholders).toHaveLength(4);
  });

  it('renders grid layout with three columns', () => {
    const wrapper = createWrapper();
    const grid = wrapper.find('.grid.auto-rows-min.gap-4.md\\:grid-cols-3');
    expect(grid.exists()).toBe(true);
  });

  it('renders three grid items in the top section', () => {
    const wrapper = createWrapper();
    const gridItems = wrapper.findAll('.grid .border-sidebar-border\\/70');
    expect(gridItems).toHaveLength(3);
  });

  it('applies correct CSS classes to grid items', () => {
    const wrapper = createWrapper();
    const gridItems = wrapper.findAll('.grid .border-sidebar-border\\/70');
    
    gridItems.forEach(item => {
      expect(item.classes()).toContain('relative');
      expect(item.classes()).toContain('aspect-video');
      expect(item.classes()).toContain('overflow-hidden');
      expect(item.classes()).toContain('rounded-xl');
      expect(item.classes()).toContain('border');
    });
  });

  it('renders main content area with correct classes', () => {
    const wrapper = createWrapper();
    const mainContent = wrapper.find('.relative.min-h-\\[100vh\\].flex-1.rounded-xl.border.md\\:min-h-min');
    expect(mainContent.exists()).toBe(true);
    expect(mainContent.classes()).toContain('border-sidebar-border/70');
    expect(mainContent.classes()).toContain('dark:border-sidebar-border');
  });

  it('applies correct layout classes to main container', () => {
    const wrapper = createWrapper();
    const mainContainer = wrapper.find('.flex.h-full.flex-1.flex-col.gap-4.rounded-xl.p-4');
    expect(mainContainer.exists()).toBe(true);
  });

  it('renders all placeholder patterns within their containers', () => {
    const wrapper = createWrapper();
    const gridItems = wrapper.findAll('.grid .border-sidebar-border\\/70');
    const mainContent = wrapper.find('.relative.min-h-\\[100vh\\].flex-1.rounded-xl.border.md\\:min-h-min');
    
    // Check that each grid item contains a placeholder
    gridItems.forEach(item => {
      expect(item.find('[data-testid="placeholder-pattern"]').exists()).toBe(true);
    });
    
    // Check that main content contains a placeholder
    expect(mainContent.find('[data-testid="placeholder-pattern"]').exists()).toBe(true);
  });

  it('maintains responsive design classes', () => {
    const wrapper = createWrapper();
    
    // Check responsive grid
    const grid = wrapper.find('.md\\:grid-cols-3');
    expect(grid.exists()).toBe(true);
    
    // Check responsive min-height
    const mainContent = wrapper.find('.md\\:min-h-min');
    expect(mainContent.exists()).toBe(true);
  });
});
