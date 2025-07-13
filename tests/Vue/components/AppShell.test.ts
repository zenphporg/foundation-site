import { describe, expect, it, vi } from 'vitest';
import { mountComponent, createMockProps } from '../setup';
import AppShell from '@/components/AppShell.vue';

// Mock usePage to return sidebarOpen prop
vi.mock('@inertiajs/vue3', async () => {
  const actual = await vi.importActual('@inertiajs/vue3');
  return {
    ...actual,
    usePage: vi.fn(() => ({
      props: {
        sidebarOpen: true,
      },
    })),
  };
});

describe('AppShell', () => {
  it('renders correctly with default props', () => {
    const wrapper = mountComponent(AppShell);
    
    expect(wrapper.exists()).toBe(true);
  });

  it('renders div with header variant', () => {
    const wrapper = mountComponent(AppShell, {
      props: createMockProps({ variant: 'header' }),
    });
    
    const divElement = wrapper.find('div');
    expect(divElement.exists()).toBe(true);
    expect(divElement.classes()).toContain('flex');
    expect(divElement.classes()).toContain('min-h-screen');
    expect(divElement.classes()).toContain('w-full');
    expect(divElement.classes()).toContain('flex-col');
  });

  it('renders SidebarProvider when variant is not header', () => {
    const wrapper = mountComponent(AppShell, {
      props: createMockProps({ variant: 'sidebar' }),
    });
    
    // Should not render the div with header classes
    const headerDiv = wrapper.find('div.flex.min-h-screen');
    expect(headerDiv.exists()).toBe(false);
    
    // Should render SidebarProvider
    const sidebarProvider = wrapper.findComponent({ name: 'SidebarProvider' });
    expect(sidebarProvider.exists()).toBe(true);
  });

  it('renders SidebarProvider when variant is undefined', () => {
    const wrapper = mountComponent(AppShell);
    
    const sidebarProvider = wrapper.findComponent({ name: 'SidebarProvider' });
    expect(sidebarProvider.exists()).toBe(true);
  });

  it('passes defaultOpen prop to SidebarProvider from usePage', () => {
    const wrapper = mountComponent(AppShell, {
      props: createMockProps({ variant: 'sidebar' }),
    });
    
    const sidebarProvider = wrapper.findComponent({ name: 'SidebarProvider' });
    expect(sidebarProvider.props('defaultOpen')).toBe(true);
  });

  it('renders slot content in header variant', () => {
    const slotContent = '<div data-testid="header-slot">Header Content</div>';
    const wrapper = mountComponent(AppShell, {
      props: createMockProps({ variant: 'header' }),
      slots: {
        default: slotContent,
      },
    });
    
    expect(wrapper.find('[data-testid="header-slot"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="header-slot"]').text()).toBe('Header Content');
  });

  it('renders slot content in sidebar variant', () => {
    const slotContent = '<div data-testid="sidebar-slot">Sidebar Content</div>';
    const wrapper = mountComponent(AppShell, {
      props: createMockProps({ variant: 'sidebar' }),
      slots: {
        default: slotContent,
      },
    });
    
    expect(wrapper.find('[data-testid="sidebar-slot"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="sidebar-slot"]').text()).toBe('Sidebar Content');
  });

  it('uses sidebarOpen from usePage props', () => {
    // Test that the component correctly accesses the sidebarOpen prop
    const wrapper = mountComponent(AppShell);
    
    // The component should render without errors and use the mocked sidebarOpen value
    expect(wrapper.exists()).toBe(true);
    
    const sidebarProvider = wrapper.findComponent({ name: 'SidebarProvider' });
    expect(sidebarProvider.props('defaultOpen')).toBe(true);
  });
});
