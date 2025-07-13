import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Label } from '@/components/ui/label';

// Mock reka-ui components
vi.mock('reka-ui', () => ({
  Label: {
    name: 'Label',
    props: ['for', 'class'],
    template: `
      <label 
        :for="$props.for"
        :class="$props.class"
        data-testid="reka-label"
      >
        <slot />
      </label>
    `,
  },
}));

// Mock utils
vi.mock('@/lib/utils', () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(' ')),
}));

describe('Label', () => {
  const createWrapper = (props = {}, slots = {}) => {
    return mount(Label, {
      props,
      slots,
    });
  };

  it('renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="reka-label"]').exists()).toBe(true);
  });

  it('has correct data-slot attribute', () => {
    const wrapper = createWrapper();
    const label = wrapper.find('label');
    expect(label.attributes('data-slot')).toBe('label');
  });

  it('renders with default classes', () => {
    const wrapper = createWrapper();
    const label = wrapper.find('label');
    expect(label.classes()).toContain('flex');
    expect(label.classes()).toContain('items-center');
    expect(label.classes()).toContain('gap-2');
    expect(label.classes()).toContain('text-sm');
    expect(label.classes()).toContain('leading-none');
    expect(label.classes()).toContain('font-medium');
    expect(label.classes()).toContain('select-none');
  });

  it('applies custom class prop', () => {
    const customClass = 'custom-label-class';
    const wrapper = createWrapper({ class: customClass });
    const label = wrapper.find('label');
    expect(label.classes()).toContain(customClass);
  });

  it('renders slot content', () => {
    const wrapper = createWrapper({}, {
      default: 'Label text',
    });
    
    expect(wrapper.text()).toContain('Label text');
  });

  it('renders complex slot content', () => {
    const wrapper = createWrapper({}, {
      default: '<span data-testid="label-icon">Icon</span> Label with icon',
    });
    
    expect(wrapper.find('[data-testid="label-icon"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Label with icon');
  });

  it('forwards for prop correctly', () => {
    const wrapper = createWrapper({ for: 'input-id' });
    const label = wrapper.find('label');
    expect(label.attributes('for')).toBe('input-id');
  });

  it('has disabled state styles', () => {
    const wrapper = createWrapper();
    const label = wrapper.find('label');
    
    expect(label.classes()).toContain('group-data-[disabled=true]:pointer-events-none');
    expect(label.classes()).toContain('group-data-[disabled=true]:opacity-50');
  });

  it('has peer disabled styles', () => {
    const wrapper = createWrapper();
    const label = wrapper.find('label');
    
    expect(label.classes()).toContain('peer-disabled:cursor-not-allowed');
    expect(label.classes()).toContain('peer-disabled:opacity-50');
  });

  it('delegates props correctly', () => {
    const props = {
      for: 'test-input',
      'data-testid': 'custom-label',
    };
    const wrapper = createWrapper(props);
    
    // The for prop should be forwarded
    expect(wrapper.vm.for).toBe('test-input');
  });

  it('excludes class from delegated props', () => {
    const wrapper = createWrapper({ 
      class: 'custom-class',
      for: 'input-id',
    });
    
    // Class should not be in delegated props but for should be
    expect(wrapper.vm.for).toBe('input-id');
  });

  it('renders as label element', () => {
    const wrapper = createWrapper();
    const label = wrapper.find('label');
    expect(label.element.tagName).toBe('LABEL');
  });

  it('handles empty content gracefully', () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toBe('');
    expect(wrapper.exists()).toBe(true);
  });

  it('maintains semantic structure for accessibility', () => {
    const wrapper = createWrapper({ for: 'username' }, {
      default: 'Username',
    });
    
    const label = wrapper.find('label');
    expect(label.attributes('for')).toBe('username');
    expect(label.text()).toBe('Username');
  });

  it('supports multiple child elements', () => {
    const wrapper = createWrapper({}, {
      default: `
        <span>Required</span>
        <span>*</span>
        Username
      `,
    });
    
    expect(wrapper.text()).toContain('Required');
    expect(wrapper.text()).toContain('*');
    expect(wrapper.text()).toContain('Username');
  });
});
