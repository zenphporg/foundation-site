import InputError from '@/Components/InputError.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('InputError', () => {
  it('renders correctly when message is provided', () => {
    const wrapper = mount(InputError, {
      props: {
        message: 'This field is required',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
  });

  it('displays the error message', () => {
    const errorMessage = 'This field is required';
    const wrapper = mount(InputError, {
      props: {
        message: errorMessage,
      },
    });

    expect(wrapper.text()).toBe(errorMessage);
  });

  it('is hidden when no message is provided', () => {
    const wrapper = mount(InputError);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(false);
  });

  it('is hidden when message is empty string', () => {
    const wrapper = mount(InputError, {
      props: {
        message: '',
      },
    });

    expect(wrapper.isVisible()).toBe(false);
  });

  it('is hidden when message is undefined', () => {
    const wrapper = mount(InputError, {
      props: {
        message: undefined,
      },
    });

    expect(wrapper.isVisible()).toBe(false);
  });

  it('applies correct styling', () => {
    const wrapper = mount(InputError, {
      props: {
        message: 'Error message',
      },
    });

    const paragraph = wrapper.find('p');
    expect(paragraph.classes()).toContain('text-sm');
    expect(paragraph.classes()).toContain('text-red-600');
    expect(paragraph.classes()).toContain('dark:text-red-500');
  });

  it('updates text content when message prop changes', async () => {
    const wrapper = mount(InputError, {
      props: {
        message: 'Initial error',
      },
    });

    expect(wrapper.text()).toBe('Initial error');

    await wrapper.setProps({ message: 'New error message' });
    expect(wrapper.text()).toBe('New error message');

    await wrapper.setProps({ message: 'Another error' });
    expect(wrapper.text()).toBe('Another error');
  });

  it('handles special characters in message', () => {
    const specialMessage = 'Error with <script>alert("xss")</script> & symbols';
    const wrapper = mount(InputError, {
      props: {
        message: specialMessage,
      },
    });

    expect(wrapper.text()).toBe(specialMessage);
  });
});
