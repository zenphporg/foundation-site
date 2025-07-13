import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import TextLink from '@/Components/TextLink.vue';

describe('TextLink', () => {
  it('renders correctly with href', () => {
    const wrapper = mount(TextLink, {
      props: {
        href: '/test-link',
      },
      slots: {
        default: 'Test Link Text',
      },
    });
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toBe('Test Link Text');
  });

  it('passes href prop to Link component', () => {
    const wrapper = mount(TextLink, {
      props: {
        href: '/test-link',
      },
    });
    
    expect(wrapper.attributes('href')).toBe('/test-link');
  });

  it('passes tabindex prop to Link component', () => {
    const wrapper = mount(TextLink, {
      props: {
        href: '/test-link',
        tabindex: 5,
      },
    });
    
    expect(wrapper.attributes('tabindex')).toBe('5');
  });

  it('passes method prop to Link component', () => {
    const wrapper = mount(TextLink, {
      props: {
        href: '/test-link',
        method: 'post',
      },
    });
    
    expect(wrapper.attributes('method')).toBe('post');
  });

  it('passes as prop to Link component', () => {
    const wrapper = mount(TextLink, {
      props: {
        href: '/test-link',
        as: 'button',
      },
    });
    
    expect(wrapper.attributes('as')).toBe('button');
  });

  it('applies correct CSS classes', () => {
    const wrapper = mount(TextLink, {
      props: {
        href: '/test-link',
      },
    });
    
    expect(wrapper.classes()).toContain('text-foreground');
    expect(wrapper.classes()).toContain('underline');
    expect(wrapper.classes()).toContain('decoration-neutral-300');
    expect(wrapper.classes()).toContain('underline-offset-4');
    expect(wrapper.classes()).toContain('transition-colors');
    expect(wrapper.classes()).toContain('duration-300');
    expect(wrapper.classes()).toContain('ease-out');
  });

  it('renders slot content', () => {
    const slotContent = '<span>Custom Content</span>';
    const wrapper = mount(TextLink, {
      props: {
        href: '/test-link',
      },
      slots: {
        default: slotContent,
      },
    });
    
    expect(wrapper.html()).toContain('<span>Custom Content</span>');
  });

  it('handles empty slot content', () => {
    const wrapper = mount(TextLink, {
      props: {
        href: '/test-link',
      },
    });
    
    expect(wrapper.text()).toBe('');
  });

  it('works without optional props', () => {
    const wrapper = mount(TextLink, {
      props: {
        href: '/test-link',
      },
    });
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.attributes('href')).toBe('/test-link');
    expect(wrapper.attributes('tabindex')).toBeUndefined();
    expect(wrapper.attributes('method')).toBeUndefined();
    expect(wrapper.attributes('as')).toBeUndefined();
  });
});
