import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppSidebarHeader from '@/components/AppSidebarHeader.vue';
import type { BreadcrumbItemType } from '@/types';

// Mock the UI components
vi.mock('@/components/ui/sidebar', () => ({
  SidebarTrigger: {
    name: 'SidebarTrigger',
    props: ['class'],
    template: '<button :class="$props.class" data-testid="sidebar-trigger">Toggle</button>',
  },
}));

vi.mock('@/components/Breadcrumbs.vue', () => ({
  default: {
    name: 'Breadcrumbs',
    props: ['breadcrumbs'],
    template: '<nav data-testid="breadcrumbs">Breadcrumbs</nav>',
  },
}));

describe('AppSidebarHeader', () => {
  const createWrapper = (props = {}) => {
    return mount(AppSidebarHeader, {
      props,
    });
  };

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('header').exists()).toBe(true);
  });

  it('renders sidebar trigger', () => {
    const wrapper = createWrapper();
    const trigger = wrapper.find('[data-testid="sidebar-trigger"]');
    expect(trigger.exists()).toBe(true);
    expect(trigger.classes()).toContain('-ml-1');
  });

  it('renders header with correct classes', () => {
    const wrapper = createWrapper();
    const header = wrapper.find('header');
    expect(header.classes()).toContain('border-sidebar-border/70');
    expect(header.classes()).toContain('flex');
    expect(header.classes()).toContain('h-16');
    expect(header.classes()).toContain('shrink-0');
  });

  it('does not render breadcrumbs when none provided', () => {
    const wrapper = createWrapper();
    const breadcrumbs = wrapper.find('[data-testid="breadcrumbs"]');
    expect(breadcrumbs.exists()).toBe(false);
  });

  it('does not render breadcrumbs when empty array provided', () => {
    const wrapper = createWrapper({ breadcrumbs: [] });
    const breadcrumbs = wrapper.find('[data-testid="breadcrumbs"]');
    expect(breadcrumbs.exists()).toBe(false);
  });

  it('renders breadcrumbs when provided', () => {
    const mockBreadcrumbs: BreadcrumbItemType[] = [
      { label: 'Home', href: '/' },
      { label: 'Dashboard', href: '/dashboard' },
    ];
    const wrapper = createWrapper({ breadcrumbs: mockBreadcrumbs });
    const breadcrumbs = wrapper.find('[data-testid="breadcrumbs"]');
    expect(breadcrumbs.exists()).toBe(true);
  });

  it('passes breadcrumbs prop to Breadcrumbs component', () => {
    const mockBreadcrumbs: BreadcrumbItemType[] = [
      { label: 'Home', href: '/' },
      { label: 'Settings', href: '/settings' },
    ];
    const wrapper = createWrapper({ breadcrumbs: mockBreadcrumbs });
    const breadcrumbsComponent = wrapper.findComponent({ name: 'Breadcrumbs' });
    expect(breadcrumbsComponent.exists()).toBe(true);
    expect(breadcrumbsComponent.props('breadcrumbs')).toEqual(mockBreadcrumbs);
  });

  it('renders container div with correct structure', () => {
    const wrapper = createWrapper();
    const container = wrapper.find('.flex.items-center.gap-2');
    expect(container.exists()).toBe(true);
  });

  it('uses default empty array for breadcrumbs prop', () => {
    const wrapper = createWrapper();
    expect(wrapper.vm.breadcrumbs).toEqual([]);
  });

  it('renders with responsive padding classes', () => {
    const wrapper = createWrapper();
    const header = wrapper.find('header');
    expect(header.classes()).toContain('px-6');
    expect(header.classes()).toContain('md:px-4');
  });

  it('has transition classes for responsive behavior', () => {
    const wrapper = createWrapper();
    const header = wrapper.find('header');
    expect(header.classes()).toContain('transition-[width,height]');
    expect(header.classes()).toContain('ease-linear');
  });
});
