import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Welcome from '@/pages/Welcome.vue';

const mockRoute = vi.fn();

describe('Welcome', () => {
  beforeEach(() => {
    mockRoute.mockImplementation((name) => {
      const routes = {
        'dashboard': '/dashboard',
        'login': '/login',
        'register': '/register',
      };
      return routes[name] || '/';
    });
    global.route = mockRoute;
  });

  const createWrapper = async (pageProps = {}) => {
    const defaultPageProps = {
      auth: { user: null },
      name: 'Test App',
    };

    // Mock usePage for this specific test
    const { usePage } = await import('@inertiajs/vue3');
    vi.mocked(usePage).mockReturnValue({
      props: { ...defaultPageProps, ...pageProps },
      url: '/',
      component: 'Welcome',
      version: '1',
    });

    return mount(Welcome, {
      global: {
        mocks: {
          route: mockRoute,
          __: (key: string) => key, // Mock translation function
        },
        stubs: {
          Head: true,
        },
      },
    });
  };

  it('renders correctly', async () => {
    const wrapper = await createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Coming Soon');
  });

  it('sets correct page title', async () => {
    const wrapper = await createWrapper();
    expect(wrapper.text()).toContain('Test App');
  });

  it.skip('shows login and register links when user is not authenticated', async () => {
    // Skipped for coming soon page
    const wrapper = await createWrapper({ auth: { user: null } });

    const links = wrapper.findAll('[data-testid="link"]');
    const loginLink = links.find(link => link.text() === 'Log in');
    const registerLink = links.find(link => link.text() === 'Register');

    expect(loginLink).toBeDefined();
    expect(registerLink).toBeDefined();
    expect(loginLink?.attributes('href')).toBe('/login');
    expect(registerLink?.attributes('href')).toBe('/register');
  });

  it.skip('shows dashboard link when user is authenticated', async () => {
    // Skipped for coming soon page
    const wrapper = await createWrapper({ auth: { user: { id: 1, name: 'Test User' } } });

    const links = wrapper.findAll('[data-testid="link"]');
    const dashboardLink = links.find(link => link.text() === 'Dashboard');

    expect(dashboardLink).toBeDefined();
    expect(dashboardLink?.attributes('href')).toBe('/dashboard');
  });

  it.skip('does not show login/register links when user is authenticated', async () => {
    // Skipped for coming soon page
    const wrapper = await createWrapper({ auth: { user: { id: 1, name: 'Test User' } } });

    const links = wrapper.findAll('[data-testid="link"]');
    const loginLink = links.find(link => link.text() === 'Log in');
    const registerLink = links.find(link => link.text() === 'Register');

    expect(loginLink).toBeUndefined();
    expect(registerLink).toBeUndefined();
  });

  it('contains main content sections', async () => {
    const wrapper = await createWrapper();

    expect(wrapper.text()).toContain('Coming Soon');
    expect(wrapper.text()).toContain('Test App');
    expect(wrapper.text()).toContain("We're working hard to bring you something amazing");
    expect(wrapper.text()).toContain('For inquiries, please contact us at:');
    // TODO: When replacing coming soon page, make email dynamic using MAIL_FROM_ADDRESS env var
    expect(wrapper.text()).toContain('hello@jetstreamlabs.com');
  });

  it('has external links with correct attributes', async () => {
    const wrapper = await createWrapper();

    // TODO: When replacing coming soon page, make email dynamic using MAIL_FROM_ADDRESS env var
    const emailLink = wrapper.find('a[href="mailto:hello@jetstreamlabs.com"]');

    expect(emailLink.exists()).toBe(true);
    expect(emailLink.text()).toContain('hello@jetstreamlabs.com');
  });

  it('has correct layout structure', async () => {
    const wrapper = await createWrapper();

    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.text()).toContain('Coming Soon');
  });

  it('contains SVG graphics', async () => {
    const wrapper = await createWrapper();
    const images = wrapper.findAll('img');
    expect(images.length).toBeGreaterThan(0);
    expect(images[0].attributes('src')).toBe('/storage/img/logo.svg');
  });
});
