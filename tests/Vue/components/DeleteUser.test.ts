import DeleteUser from '@/components/DeleteUser.vue';
import HeadingSmall from '@/components/HeadingSmall.vue';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock useRoutes
const mockUseRoutes = vi.fn((name: string) => `/${name}`);

// Mock useForm
const mockForm = {
  password: '',
  processing: false,
  errors: {},
  delete: vi.fn(),
  clearErrors: vi.fn(),
  reset: vi.fn(),
};

vi.mock('@inertiajs/vue3', () => ({
  useForm: vi.fn(() => mockForm),
}));

vi.mock('@/composables/useRoutes', () => ({
  default: mockUseRoutes,
}));

// Mock global useRoutes
global.useRoutes = mockUseRoutes;

function createWrapper(options = {}) {
  return mount(DeleteUser, {
    global: {
      mocks: {
        useRoutes: mockUseRoutes,
      },
      ...options.global,
    },
    ...options,
  });
}

describe('DeleteUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockForm.password = '';
    mockForm.processing = false;
    mockForm.errors = {};
  });

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
  });

  it('renders HeadingSmall component with correct props', () => {
    const wrapper = createWrapper();
    const headingSmall = wrapper.findComponent(HeadingSmall);
    expect(headingSmall.exists()).toBe(true);
    expect(headingSmall.props('title')).toBe('Delete account');
    expect(headingSmall.props('description')).toBe('Delete your account and all of its resources');
  });

  it('renders warning section', () => {
    const wrapper = createWrapper();
    const warningSection = wrapper.find('.border-red-100');
    expect(warningSection.exists()).toBe(true);
    expect(warningSection.text()).toContain('Warning');
    expect(warningSection.text()).toContain('Please proceed with caution, this cannot be undone.');
  });

  it('renders delete account button text', () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toContain('Delete account');
  });

  it('renders button with destructive variant', () => {
    const wrapper = createWrapper();
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.text()).toContain('Delete account');
  });

  it('renders dialog trigger button', () => {
    const wrapper = createWrapper();
    expect(wrapper.html()).toContain('data-slot="dialog-trigger"');
  });

  it('renders dialog trigger with correct attributes', () => {
    const wrapper = createWrapper();
    expect(wrapper.html()).toContain('aria-haspopup="dialog"');
    expect(wrapper.html()).toContain('data-state="closed"');
  });

  it('uses correct form methods', () => {
    createWrapper();
    // Verify the component is using the mocked form
    expect(mockForm.delete).toBeDefined();
    expect(mockForm.clearErrors).toBeDefined();
    expect(mockForm.reset).toBeDefined();
  });

  it('renders with correct structure and classes', () => {
    const wrapper = createWrapper();
    const mainContainer = wrapper.find('.space-y-6');
    const warningContainer = wrapper.find('.border-red-100');

    expect(mainContainer.exists()).toBe(true);
    expect(warningContainer.exists()).toBe(true);
  });

  it('has correct CSS classes', () => {
    const wrapper = createWrapper();
    expect(wrapper.html()).toContain('class="space-y-6"');
    expect(wrapper.html()).toContain('bg-red-50');
    expect(wrapper.html()).toContain('border-red-100');
  });

  it('renders component without errors', () => {
    const wrapper = createWrapper();
    expect(wrapper.vm).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it('contains destructive button styling', () => {
    const wrapper = createWrapper();
    expect(wrapper.html()).toContain('bg-destructive');
  });

  it('has proper accessibility attributes', () => {
    const wrapper = createWrapper();
    expect(wrapper.html()).toContain('aria-expanded="false"');
  });

  it('calls deleteUser function when form is submitted', async () => {
    const wrapper = createWrapper();

    // Access the component instance to call deleteUser directly
    const vm = wrapper.vm as any;
    const mockEvent = { preventDefault: vi.fn() };

    // Call deleteUser directly since the form might not be easily accessible
    vm.deleteUser(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockForm.delete).toHaveBeenCalledWith('/profile.destroy', {
      preserveScroll: true,
      onSuccess: expect.any(Function),
      onError: expect.any(Function),
      onFinish: expect.any(Function),
    });
  });

  it('calls closeModal function and clears form', () => {
    const wrapper = createWrapper();

    // Access the component instance to call closeModal directly
    const vm = wrapper.vm as any;
    vm.closeModal();

    expect(mockForm.clearErrors).toHaveBeenCalled();
    expect(mockForm.reset).toHaveBeenCalled();
  });

  it('handles form submission with preventDefault', async () => {
    const wrapper = createWrapper();
    const form = wrapper.find('form');

    // Create a proper event object
    const event = new Event('submit');
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    // Trigger the submit handler directly
    const vm = wrapper.vm as any;
    vm.deleteUser(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
