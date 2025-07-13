import AppHeader from '@/components/AppHeader.vue';
import AppLogo from '@/components/AppLogo.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createMockBreadcrumbs, createMockPageProps } from '../setup';

// Mock the usePage composable
const mockUsePage = vi.fn();
vi.mock('@inertiajs/vue3', async () => {
  const actual = await vi.importActual('@inertiajs/vue3');
  return {
    ...actual,
    usePage: () => mockUsePage(),
  };
});

function createWrapper(props = {}, options = {}) {
  return mount(AppHeader, {
    props,
    global: {
      mocks: {
        route: vi.fn((name: string) => `/${name}`),
      },
      ...options.global,
    },
    ...options,
  });
}

describe('AppHeader', () => {
  beforeEach(() => {
    mockUsePage.mockReturnValue({
      props: createMockPageProps(),
      url: '/dashboard',
      component: 'Dashboard',
      version: '1',
    });
  });

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
  });

  it('renders AppLogo component', () => {
    const wrapper = createWrapper();
    const appLogo = wrapper.findComponent(AppLogo);
    expect(appLogo.exists()).toBe(true);
  });

  it('renders mobile menu button', () => {
    const wrapper = createWrapper();
    const mobileMenuButton = wrapper.find('.lg\\:hidden button');
    expect(mobileMenuButton.exists()).toBe(true);
  });

  it('renders desktop navigation menu', () => {
    const wrapper = createWrapper();
    const desktopNav = wrapper.find('.hidden.lg\\:flex');
    expect(desktopNav.exists()).toBe(true);
  });

  it('renders search button', () => {
    const wrapper = createWrapper();
    const searchButton = wrapper.find('button[class*="group"]');
    expect(searchButton.exists()).toBe(true);
  });

  it('renders breadcrumbs when provided', () => {
    const breadcrumbs = createMockBreadcrumbs();
    const wrapper = createWrapper({ breadcrumbs });
    const breadcrumbsComponent = wrapper.findComponent(Breadcrumbs);
    expect(breadcrumbsComponent.exists()).toBe(true);
  });

  it('does not render breadcrumbs section when breadcrumbs length is 1 or less', () => {
    const wrapper = createWrapper({ breadcrumbs: [{ title: 'Home', href: '/' }] });
    const breadcrumbsSection = wrapper.find('[class*="border-sidebar-border/70"]');
    expect(breadcrumbsSection.exists()).toBe(false);
  });

  it('renders breadcrumbs section when breadcrumbs length is greater than 1', () => {
    const breadcrumbs = createMockBreadcrumbs();
    const wrapper = createWrapper({ breadcrumbs });
    const breadcrumbsSection = wrapper.find('[class*="border-sidebar-border/70"]');
    expect(breadcrumbsSection.exists()).toBe(true);
  });

  it('renders external navigation links with correct attributes', () => {
    const wrapper = createWrapper();
    const externalLinks = wrapper.findAll('a[target="_blank"]');
    expect(externalLinks.length).toBeGreaterThan(0);

    externalLinks.forEach((link) => {
      expect(link.attributes('rel')).toBe('noopener noreferrer');
    });
  });

  it('renders main header structure', () => {
    const wrapper = createWrapper();
    const headerContainer = wrapper.find('.border-sidebar-border\\/80');
    expect(headerContainer.exists()).toBe(true);
  });

  it('renders navigation items correctly', () => {
    const wrapper = createWrapper();
    const dashboardLinks = wrapper.findAll('a[href="/dashboard"]');
    expect(dashboardLinks.length).toBeGreaterThan(0);
  });

  it('renders right navigation items correctly', () => {
    const wrapper = createWrapper();
    const repositoryLink = wrapper.find('a[href="https://github.com/laravel/vue-starter-kit"]');
    const docsLink = wrapper.find('a[href="https://laravel.com/docs/starter-kits"]');

    expect(repositoryLink.exists()).toBe(true);
    expect(docsLink.exists()).toBe(true);
  });

  it('handles different breadcrumb configurations', () => {
    const wrapper = createWrapper({ breadcrumbs: [] });
    const breadcrumbsSection = wrapper.find('[class*="border-sidebar-border/70"]');
    expect(breadcrumbsSection.exists()).toBe(false);
  });

  it('renders with default props', () => {
    const wrapper = createWrapper();
    expect(wrapper.props('breadcrumbs')).toEqual([]);
  });

  it('renders header container with correct classes', () => {
    const wrapper = createWrapper();
    const headerContainer = wrapper.find('.mx-auto.flex.h-16');
    expect(headerContainer.exists()).toBe(true);
  });

  it('renders mobile sheet component', () => {
    const wrapper = createWrapper();
    const sheetTrigger = wrapper.find('[class*="lg:hidden"] button');
    expect(sheetTrigger.exists()).toBe(true);
  });

  it('renders user dropdown menu', () => {
    const wrapper = createWrapper();
    const dropdownTrigger = wrapper.find('button[class*="rounded-full"]');
    expect(dropdownTrigger.exists()).toBe(true);
  });
});
