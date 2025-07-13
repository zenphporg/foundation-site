import VerifyEmail from '@/pages/auth/VerifyEmail.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

const mockUseForm = vi.fn();
const mockPost = vi.fn();
const mockUseRoutes = vi.fn();
const mockRoute = vi.fn();

vi.mock('@inertiajs/vue3', () => ({
  Head: { name: 'Head', props: ['title'], template: '<head data-testid="head" :data-title="title"></head>' },
  useForm: () => mockUseForm(),
}));

vi.mock('@/composables/useRoutes', () => ({ default: () => mockUseRoutes() }));

vi.mock('@/layouts/AuthLayout.vue', () => ({
  default: {
    name: 'AuthLayout',
    props: ['title', 'description'],
    template: '<div data-testid="auth-layout" :data-title="title" :data-description="description"><slot /></div>',
  },
}));

vi.mock('@/components/TextLink.vue', () => ({
  default: {
    name: 'TextLink',
    props: ['href', 'method', 'as'],
    template: '<a data-testid="text-link" :href="href" :data-method="method" :data-as="as" :class="$attrs.class"><slot /></a>',
  },
}));

vi.mock('@/components/ui/button', () => ({
  Button: {
    name: 'Button',
    props: ['disabled', 'variant'],
    template: '<button data-testid="button" :disabled="disabled" :data-variant="variant"><slot /></button>',
  },
}));

vi.mock('lucide-vue-next', () => ({
  LoaderCircle: { name: 'LoaderCircle', template: '<div data-testid="loader-circle" :class="$attrs.class"></div>' },
}));

describe('VerifyEmail', () => {
  beforeEach(() => {
    const formMock = { processing: false, post: mockPost };
    mockUseForm.mockReturnValue(formMock);
    mockUseRoutes.mockReturnValue('/email/verification-notification');
    mockRoute.mockImplementation((name) => ({ logout: '/logout' })[name] || '/');
    global.route = mockRoute;
  });

  const createWrapper = (props = {}) => mount(VerifyEmail, { props, global: { mocks: { route: mockRoute } } });

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="auth-layout"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="head"]').exists()).toBe(true);
  });

  it('sets correct page title', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('[data-testid="head"]').attributes('data-title')).toBe('Email verification');
  });

  it('passes correct props to AuthLayout', () => {
    const wrapper = createWrapper();
    const authLayout = wrapper.find('[data-testid="auth-layout"]');
    expect(authLayout.attributes('data-title')).toBe('Verify email');
    expect(authLayout.attributes('data-description')).toBe('Please verify your email address by clicking on the link we just emailed to you.');
  });

  it('displays verification link sent message when status is provided', () => {
    const wrapper = createWrapper({ status: 'verification-link-sent' });
    const statusDiv = wrapper.find('.text-green-600');
    expect(statusDiv.exists()).toBe(true);
    expect(statusDiv.text()).toBe('A new verification link has been sent to the email address you provided during registration.');
  });

  it('does not display verification message when status is not provided', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.text-green-600').exists()).toBe(false);
  });

  it('does not display verification message when status is different', () => {
    const wrapper = createWrapper({ status: 'other-status' });
    expect(wrapper.find('.text-green-600').exists()).toBe(false);
  });

  it('renders resend verification button correctly', () => {
    const wrapper = createWrapper();
    const button = wrapper.find('[data-testid="button"]');
    expect(button.text()).toContain('Resend verification email');
    expect(button.attributes('data-variant')).toBe('secondary');
  });

  it('shows loader when processing', () => {
    mockUseForm.mockReturnValue({ processing: true, post: mockPost });
    const wrapper = createWrapper();
    expect(wrapper.find('[data-testid="loader-circle"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="button"]').attributes('disabled')).toBe('');
  });

  it('renders logout link correctly', () => {
    const wrapper = createWrapper();
    const logoutLink = wrapper.find('[data-testid="text-link"]');
    expect(logoutLink.text()).toBe('Log out');
    expect(logoutLink.attributes('href')).toBe('/logout');
    expect(logoutLink.attributes('data-method')).toBe('post');
    expect(logoutLink.attributes('data-as')).toBe('button');
  });

  it('submits form correctly', async () => {
    const wrapper = createWrapper();
    await wrapper.find('form').trigger('submit.prevent');
    expect(mockPost).toHaveBeenCalledWith('/email/verification-notification');
  });

  it('has correct form structure', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.find('form').classes()).toContain('space-y-6');
    expect(wrapper.find('form').classes()).toContain('text-center');
  });

  it('applies correct CSS classes to logout link', () => {
    const wrapper = createWrapper();
    const logoutLink = wrapper.find('[data-testid="text-link"]');
    expect(logoutLink.classes()).toContain('mx-auto');
    expect(logoutLink.classes()).toContain('block');
    expect(logoutLink.classes()).toContain('text-sm');
  });

  it('initializes form correctly', () => {
    createWrapper();
    expect(mockUseForm).toHaveBeenCalled();
  });
});
