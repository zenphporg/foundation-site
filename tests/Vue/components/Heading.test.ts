import Heading from '@/Components/Heading.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('Heading', () => {
  it('renders correctly with title only', () => {
    const wrapper = mount(Heading, {
      props: {
        title: 'Test Title',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe('Test Title');
  });

  it('renders title with correct styling', () => {
    const wrapper = mount(Heading, {
      props: {
        title: 'Test Title',
      },
    });

    const h2 = wrapper.find('h2');
    expect(h2.classes()).toContain('text-xl');
    expect(h2.classes()).toContain('font-semibold');
    expect(h2.classes()).toContain('tracking-tight');
  });

  it('renders description when provided', () => {
    const wrapper = mount(Heading, {
      props: {
        title: 'Test Title',
        description: 'Test description',
      },
    });

    const description = wrapper.find('p');
    expect(description.exists()).toBe(true);
    expect(description.text()).toBe('Test description');
  });

  it('does not render description when not provided', () => {
    const wrapper = mount(Heading, {
      props: {
        title: 'Test Title',
      },
    });

    const description = wrapper.find('p');
    expect(description.exists()).toBe(false);
  });

  it('applies correct styling to description', () => {
    const wrapper = mount(Heading, {
      props: {
        title: 'Test Title',
        description: 'Test description',
      },
    });

    const description = wrapper.find('p');
    expect(description.classes()).toContain('text-muted-foreground');
    expect(description.classes()).toContain('text-sm');
  });

  it('has correct container styling', () => {
    const wrapper = mount(Heading, {
      props: {
        title: 'Test Title',
      },
    });

    const container = wrapper.find('div');
    expect(container.classes()).toContain('mb-8');
    expect(container.classes()).toContain('space-y-0.5');
  });

  it('handles empty title', () => {
    const wrapper = mount(Heading, {
      props: {
        title: '',
      },
    });

    expect(wrapper.find('h2').text()).toBe('');
  });

  it('handles empty description', () => {
    const wrapper = mount(Heading, {
      props: {
        title: 'Test Title',
        description: '',
      },
    });

    // Empty string is falsy, so v-if won't render the element
    const description = wrapper.find('p');
    expect(description.exists()).toBe(false);
  });
});
