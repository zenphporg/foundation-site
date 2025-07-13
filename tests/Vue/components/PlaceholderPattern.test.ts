import PlaceholderPattern from '@/Components/PlaceholderPattern.vue';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('PlaceholderPattern', () => {
  let mathRandomSpy: any;

  beforeEach(() => {
    // Mock Math.random to return a predictable value
    mathRandomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.123456789);
  });

  afterEach(() => {
    mathRandomSpy.mockRestore();
  });

  it('renders correctly', () => {
    const wrapper = mount(PlaceholderPattern);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('has correct SVG structure', () => {
    const wrapper = mount(PlaceholderPattern);
    const svg = wrapper.find('svg');

    expect(svg.classes()).toContain('absolute');
    expect(svg.classes()).toContain('inset-0');
    expect(svg.classes()).toContain('size-full');
    expect(svg.classes()).toContain('stroke-neutral-900/20');
    expect(svg.classes()).toContain('dark:stroke-neutral-100/20');
    expect(svg.attributes('fill')).toBe('none');
  });

  it('contains defs and pattern elements', () => {
    const wrapper = mount(PlaceholderPattern);

    expect(wrapper.find('defs').exists()).toBe(true);
    expect(wrapper.find('pattern').exists()).toBe(true);
  });

  it('generates a pattern ID', () => {
    const wrapper = mount(PlaceholderPattern);
    const pattern = wrapper.find('pattern');

    expect(pattern.attributes('id')).toMatch(/^pattern-[a-z0-9]+$/);
  });

  it('pattern has correct attributes', () => {
    const wrapper = mount(PlaceholderPattern);
    const pattern = wrapper.find('pattern');

    expect(pattern.attributes('x')).toBe('0');
    expect(pattern.attributes('y')).toBe('0');
    expect(pattern.attributes('width')).toBe('8');
    expect(pattern.attributes('height')).toBe('8');
    expect(pattern.attributes('patternUnits')).toBe('userSpaceOnUse');
  });

  it('contains path element with correct attributes', () => {
    const wrapper = mount(PlaceholderPattern);
    const path = wrapper.find('path');

    expect(path.exists()).toBe(true);
    expect(path.attributes('d')).toBe('M-1 5L5 -1M3 9L8.5 3.5');
    expect(path.attributes('stroke-width')).toBe('0.5');
  });

  it('contains rect element with correct attributes', () => {
    const wrapper = mount(PlaceholderPattern);
    const rect = wrapper.find('rect');

    expect(rect.exists()).toBe(true);
    expect(rect.attributes('stroke')).toBe('none');
    expect(rect.attributes('fill')).toMatch(/^url\(#pattern-[a-z0-9]+\)$/);
    expect(rect.attributes('width')).toBe('100%');
    expect(rect.attributes('height')).toBe('100%');
  });

  it('uses the pattern ID in the rect fill attribute', () => {
    const wrapper = mount(PlaceholderPattern);
    const pattern = wrapper.find('pattern');
    const rect = wrapper.find('rect');

    const patternId = pattern.attributes('id');
    expect(rect.attributes('fill')).toBe(`url(#${patternId})`);
  });

  it('generates valid pattern ID format', () => {
    const wrapper = mount(PlaceholderPattern);
    const pattern = wrapper.find('pattern');
    const id = pattern.attributes('id');

    // Should start with 'pattern-' and have alphanumeric characters
    expect(id).toMatch(/^pattern-[a-z0-9]+$/);
    expect(id.length).toBeGreaterThan(8); // 'pattern-' + at least 1 char
  });
});
