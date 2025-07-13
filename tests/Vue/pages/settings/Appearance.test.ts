import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Appearance from '@/pages/settings/Appearance.vue';

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

vi.mock('@/layouts/settings/Layout.vue', () => ({
  default: {
    name: 'SettingsLayout',
    template: '<div data-testid="settings-layout"><slot /></div>',
  },
}));

vi.mock('@/components/HeadingSmall.vue', () => ({
  default: {
    name: 'HeadingSmall',
    props: ['title', 'description'],
    template: '<div data-testid="heading-small" :data-title="title" :data-description="description"></div>',
  },
}));

vi.mock('@/components/AppearanceTabs.vue', () => ({
  default: {
    name: 'AppearanceTabs',
    template: '<div data-testid="appearance-tabs"></div>',
  },
}));

describe('Appearance', () => {
  const createWrapper = () => {
    return mount(Appearance);
  };

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="app-layout"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="settings-layout"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="head"]').exists()).toBe(true);
  });

  it('sets correct page title', () => {
    const wrapper = createWrapper();
    const head = wrapper.find('[data-testid="head"]');
    expect(head.attributes('data-title')).toBe('Appearance settings');
  });

  it('passes correct breadcrumbs to AppLayout', () => {
    const wrapper = createWrapper();
    const appLayout = wrapper.find('[data-testid="app-layout"]');
    const breadcrumbs = JSON.parse(appLayout.attributes('data-breadcrumbs') || '[]');
    
    expect(breadcrumbs).toHaveLength(1);
    expect(breadcrumbs[0]).toEqual({
      title: 'Appearance settings',
      href: '/settings/appearance',
    });
  });

  it('renders HeadingSmall with correct props', () => {
    const wrapper = createWrapper();
    const headingSmall = wrapper.find('[data-testid="heading-small"]');
    
    expect(headingSmall.exists()).toBe(true);
    expect(headingSmall.attributes('data-title')).toBe('Appearance settings');
    expect(headingSmall.attributes('data-description')).toBe("Update your account's appearance settings");
  });

  it('renders AppearanceTabs component', () => {
    const wrapper = createWrapper();
    const appearanceTabs = wrapper.find('[data-testid="appearance-tabs"]');
    expect(appearanceTabs.exists()).toBe(true);
  });

  it('maintains correct component hierarchy', () => {
    const wrapper = createWrapper();
    
    const appLayout = wrapper.find('[data-testid="app-layout"]');
    const settingsLayout = appLayout.find('[data-testid="settings-layout"]');
    const contentDiv = settingsLayout.find('.space-y-6');
    
    expect(settingsLayout.exists()).toBe(true);
    expect(contentDiv.exists()).toBe(true);
    expect(contentDiv.find('[data-testid="heading-small"]').exists()).toBe(true);
    expect(contentDiv.find('[data-testid="appearance-tabs"]').exists()).toBe(true);
  });

  it('applies correct CSS classes to content container', () => {
    const wrapper = createWrapper();
    const contentDiv = wrapper.find('.space-y-6');
    expect(contentDiv.exists()).toBe(true);
    expect(contentDiv.classes()).toContain('space-y-6');
  });

  it('renders all required components', () => {
    const wrapper = createWrapper();
    
    // Check all main components are present
    expect(wrapper.find('[data-testid="app-layout"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="settings-layout"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="heading-small"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="appearance-tabs"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="head"]').exists()).toBe(true);
  });

  it('has correct layout structure', () => {
    const wrapper = createWrapper();
    
    // Verify the nested structure
    const appLayout = wrapper.find('[data-testid="app-layout"]');
    expect(appLayout.exists()).toBe(true);
    
    const settingsLayout = appLayout.find('[data-testid="settings-layout"]');
    expect(settingsLayout.exists()).toBe(true);
    
    const spaceDiv = settingsLayout.find('.space-y-6');
    expect(spaceDiv.exists()).toBe(true);
    
    const headingSmall = spaceDiv.find('[data-testid="heading-small"]');
    const appearanceTabs = spaceDiv.find('[data-testid="appearance-tabs"]');
    
    expect(headingSmall.exists()).toBe(true);
    expect(appearanceTabs.exists()).toBe(true);
  });
});
