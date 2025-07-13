import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import AppLogoIcon from '@/Components/AppLogoIcon.vue';

describe('AppLogoIcon', () => {
  it('renders correctly', () => {
    const wrapper = mount(AppLogoIcon);
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('has correct viewBox', () => {
    const wrapper = mount(AppLogoIcon);
    const svg = wrapper.find('svg');
    
    expect(svg.attributes('viewBox')).toBe('0 0 40 42');
    expect(svg.attributes('xmlns')).toBe('http://www.w3.org/2000/svg');
  });

  it('applies custom className prop', () => {
    const customClass = 'custom-logo-class';
    const wrapper = mount(AppLogoIcon, {
      props: {
        className: customClass,
      },
    });
    
    expect(wrapper.find('svg').classes()).toContain(customClass);
  });

  it('inherits additional attributes', () => {
    const wrapper = mount(AppLogoIcon, {
      attrs: {
        'data-testid': 'logo-icon',
        'aria-label': 'Company Logo',
      },
    });
    
    const svg = wrapper.find('svg');
    expect(svg.attributes('data-testid')).toBe('logo-icon');
    expect(svg.attributes('aria-label')).toBe('Company Logo');
  });

  it('contains the correct path element', () => {
    const wrapper = mount(AppLogoIcon);
    const path = wrapper.find('path');
    
    expect(path.exists()).toBe(true);
    expect(path.attributes('fill')).toBe('currentColor');
    expect(path.attributes('fill-rule')).toBe('evenodd');
    expect(path.attributes('clip-rule')).toBe('evenodd');
  });

  it('applies multiple classes correctly', () => {
    const wrapper = mount(AppLogoIcon, {
      props: {
        className: 'class1 class2 class3',
      },
    });
    
    const svg = wrapper.find('svg');
    expect(svg.classes()).toContain('class1');
    expect(svg.classes()).toContain('class2');
    expect(svg.classes()).toContain('class3');
  });
});
