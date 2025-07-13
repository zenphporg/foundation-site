import AppLogo from '@/components/AppLogo.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
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

function createWrapper(options = {}) {
  const TestComponent = {
    components: { SidebarProvider, AppSidebar },
    template: `
      <SidebarProvider :default-open="true">
        <AppSidebar />
      </SidebarProvider>
    `,
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

describe('AppSidebar', () => {
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
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
  });

  it('renders Sidebar component with correct props', () => {
    const wrapper = createWrapper();
    const sidebar = wrapper.find('[data-sidebar="sidebar"]');
    expect(sidebar.exists()).toBe(true);
  });

  it('renders AppLogo component in header', () => {
    const wrapper = createWrapper();
    const appLogo = wrapper.findComponent(AppLogo);
    expect(appLogo.exists()).toBe(true);
  });

  it('renders NavMain component with main navigation items', () => {
    const wrapper = createWrapper();
    const navMain = wrapper.findComponent(NavMain);
    expect(navMain.exists()).toBe(true);
    const items = navMain.props('items');
    expect(items).toHaveLength(1);
    expect(items[0].title).toBe('Dashboard');
    expect(items[0].href).toBe('/dashboard');
    expect(typeof items[0].icon).toBe('function');
  });

  it('renders NavFooter component with footer navigation items', () => {
    const wrapper = createWrapper();
    const navFooter = wrapper.findComponent(NavFooter);
    expect(navFooter.exists()).toBe(true);
    const items = navFooter.props('items');
    expect(items).toHaveLength(2);
    expect(items[0].title).toBe('Github Repo');
    expect(items[0].href).toBe('https://github.com/druidweb/druid');
    expect(items[1].title).toBe('Documentation');
    expect(items[1].href).toBe('https://laravel.com/docs/starter-kits');
  });

  it('renders NavUser component', () => {
    const wrapper = createWrapper();
    const navUser = wrapper.findComponent(NavUser);
    expect(navUser.exists()).toBe(true);
  });

  it('renders sidebar header with menu structure', () => {
    const wrapper = createWrapper();
    const sidebarHeader = wrapper.find('[data-sidebar="header"]');
    expect(sidebarHeader.exists()).toBe(true);
  });

  it('renders sidebar content section', () => {
    const wrapper = createWrapper();
    const sidebarContent = wrapper.find('[data-sidebar="content"]');
    expect(sidebarContent.exists()).toBe(true);
  });

  it('renders sidebar footer section', () => {
    const wrapper = createWrapper();
    const sidebarFooter = wrapper.find('[data-sidebar="footer"]');
    expect(sidebarFooter.exists()).toBe(true);
  });

  it('renders navigation links correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toContain('Dashboard');
    expect(wrapper.text()).toContain('Github Repo');
    expect(wrapper.text()).toContain('Documentation');
  });

  it('renders slot content area', () => {
    const wrapper = createWrapper();
    // The slot is rendered after the sidebar in the template
    expect(wrapper.html()).toContain('data-sidebar="sidebar"');
  });

  it('has correct sidebar variant and collapsible settings', () => {
    const wrapper = createWrapper();
    expect(wrapper.html()).toContain('data-variant="inset"');
    expect(wrapper.html()).toContain('data-collapsible=""');
  });

  it('renders menu button with large size', () => {
    const wrapper = createWrapper();
    expect(wrapper.html()).toContain('data-size="lg"');
  });

  it('contains all required navigation sections', () => {
    const wrapper = createWrapper();
    const navMain = wrapper.findComponent(NavMain);
    const navFooter = wrapper.findComponent(NavFooter);
    const navUser = wrapper.findComponent(NavUser);

    expect(navMain.exists()).toBe(true);
    expect(navFooter.exists()).toBe(true);
    expect(navUser.exists()).toBe(true);
  });

  it('renders with correct component structure', () => {
    const wrapper = createWrapper();
    expect(wrapper.vm).toBeDefined();
    expect(wrapper.html()).toContain('data-sidebar');
  });
});
