import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import AppLogo from '@/Components/AppLogo.vue';
import AppLogoIcon from '@/Components/AppLogoIcon.vue';

describe('AppLogo', () => {
  it('renders correctly', () => {
    const wrapper = mount(AppLogo);
    
    expect(wrapper.exists()).toBe(true);
  });

  it('contains the logo icon component', () => {
    const wrapper = mount(AppLogo);
    const logoIcon = wrapper.findComponent(AppLogoIcon);
    
    expect(logoIcon.exists()).toBe(true);
  });

  it('has correct structure', () => {
    const wrapper = mount(AppLogo);
    
    // Check for the icon container
    const iconContainer = wrapper.find('.bg-foreground');
    expect(iconContainer.exists()).toBe(true);
    expect(iconContainer.classes()).toContain('aspect-square');
    expect(iconContainer.classes()).toContain('size-8');
    expect(iconContainer.classes()).toContain('rounded-md');
    
    // Check for the text container
    const textContainer = wrapper.find('.ml-1.grid');
    expect(textContainer.exists()).toBe(true);
    expect(textContainer.classes()).toContain('flex-1');
    expect(textContainer.classes()).toContain('text-left');
  });

  it('displays the correct text', () => {
    const wrapper = mount(AppLogo);
    
    expect(wrapper.text()).toContain('Laravel Starter Kit');
  });

  it('applies correct classes to logo icon', () => {
    const wrapper = mount(AppLogo);
    const logoIcon = wrapper.findComponent(AppLogoIcon);
    
    expect(logoIcon.classes()).toContain('size-5');
    expect(logoIcon.classes()).toContain('fill-current');
    expect(logoIcon.classes()).toContain('text-white');
    expect(logoIcon.classes()).toContain('dark:text-black');
  });

  it('has correct text styling', () => {
    const wrapper = mount(AppLogo);
    const textSpan = wrapper.find('span');
    
    expect(textSpan.exists()).toBe(true);
    expect(textSpan.classes()).toContain('mb-0.5');
    expect(textSpan.classes()).toContain('truncate');
    expect(textSpan.classes()).toContain('leading-none');
    expect(textSpan.classes()).toContain('font-semibold');
  });

  it('renders as a fragment with two main elements', () => {
    const wrapper = mount(AppLogo);
    
    // Should have the icon container and text container
    expect(wrapper.element.children).toHaveLength(2);
  });
});
