import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import HeadingSmall from '@/Components/HeadingSmall.vue';

describe('HeadingSmall', () => {
  it('renders correctly with title only', () => {
    const wrapper = mount(HeadingSmall, {
      props: {
        title: 'Test Title',
      },
    });
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h3').text()).toBe('Test Title');
  });

  it('renders title with correct styling', () => {
    const wrapper = mount(HeadingSmall, {
      props: {
        title: 'Test Title',
      },
    });
    
    const h3 = wrapper.find('h3');
    expect(h3.classes()).toContain('mb-0.5');
    expect(h3.classes()).toContain('text-base');
    expect(h3.classes()).toContain('font-medium');
  });

  it('renders description when provided', () => {
    const wrapper = mount(HeadingSmall, {
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
    const wrapper = mount(HeadingSmall, {
      props: {
        title: 'Test Title',
      },
    });
    
    const description = wrapper.find('p');
    expect(description.exists()).toBe(false);
  });

  it('applies correct styling to description', () => {
    const wrapper = mount(HeadingSmall, {
      props: {
        title: 'Test Title',
        description: 'Test description',
      },
    });
    
    const description = wrapper.find('p');
    expect(description.classes()).toContain('text-muted-foreground');
    expect(description.classes()).toContain('text-sm');
  });

  it('has correct container element', () => {
    const wrapper = mount(HeadingSmall, {
      props: {
        title: 'Test Title',
      },
    });
    
    expect(wrapper.element.tagName).toBe('HEADER');
  });

  it('handles empty title', () => {
    const wrapper = mount(HeadingSmall, {
      props: {
        title: '',
      },
    });
    
    expect(wrapper.find('h3').text()).toBe('');
  });

  it('handles empty description', () => {
    const wrapper = mount(HeadingSmall, {
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
