import { Card } from '@/components/ui/card';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('Card', () => {
  const createWrapper = (props = {}, slots = {}) => {
    return mount(Card, {
      props,
      slots,
    });
  };

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.element.tagName).toBe('DIV');
  });

  it('renders with default classes', () => {
    const wrapper = createWrapper();
    expect(wrapper.classes()).toContain('rounded-xl');
    expect(wrapper.classes()).toContain('border');
    expect(wrapper.classes()).toContain('bg-card');
    expect(wrapper.classes()).toContain('text-card-foreground');
    expect(wrapper.classes()).toContain('shadow-sm');
    expect(wrapper.classes()).toContain('flex');
    expect(wrapper.classes()).toContain('flex-col');
    expect(wrapper.classes()).toContain('gap-6');
    expect(wrapper.classes()).toContain('py-6');
  });

  it('applies custom class prop', () => {
    const customClass = 'custom-card-class';
    const wrapper = createWrapper({ class: customClass });
    expect(wrapper.classes()).toContain(customClass);
    // Should still have default classes
    expect(wrapper.classes()).toContain('rounded-xl');
    expect(wrapper.classes()).toContain('border');
  });

  it('renders slot content', () => {
    const slotContent = '<p>Card content</p>';
    const wrapper = createWrapper({}, { default: slotContent });
    expect(wrapper.html()).toContain('Card content');
  });

  it('renders multiple slot elements', () => {
    const slotContent = `
      <h2>Card Title</h2>
      <p>Card description</p>
      <button>Action</button>
    `;
    const wrapper = createWrapper({}, { default: slotContent });
    expect(wrapper.html()).toContain('Card Title');
    expect(wrapper.html()).toContain('Card description');
    expect(wrapper.html()).toContain('Action');
  });

  it('can be used as a container for other components', () => {
    const wrapper = createWrapper(
      {},
      {
        default: `
        <div data-testid="card-header">Header</div>
        <div data-testid="card-content">Content</div>
        <div data-testid="card-footer">Footer</div>
      `,
      },
    );

    expect(wrapper.find('[data-testid="card-header"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="card-content"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="card-footer"]').exists()).toBe(true);
  });

  it('maintains semantic structure', () => {
    const wrapper = createWrapper();
    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.attributes('role')).toBeUndefined(); // No specific role by default
  });

  it('handles empty content gracefully', () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toBe('');
    expect(wrapper.exists()).toBe(true);
  });
});
