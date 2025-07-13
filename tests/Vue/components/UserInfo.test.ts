import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import UserInfo from '@/Components/UserInfo.vue';

// Mock the composable
vi.mock('@/composables/useInitials', () => ({
  useInitials: () => ({
    getInitials: vi.fn((name: string) => {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }),
  }),
}));

// Mock the UI components
vi.mock('@/components/ui/avatar', () => ({
  Avatar: {
    name: 'Avatar',
    template: '<div class="avatar"><slot /></div>',
  },
  AvatarFallback: {
    name: 'AvatarFallback',
    template: '<div class="avatar-fallback"><slot /></div>',
  },
  AvatarImage: {
    name: 'AvatarImage',
    props: ['src', 'alt'],
    template: '<img :src="src" :alt="alt" class="avatar-image" />',
  },
}));

describe('UserInfo', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@test.local',
    avatar: 'https://test.local/avatar.jpg',
  };

  const mockUserWithoutAvatar = {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@test.local',
    avatar: '',
  };

  it('renders correctly with user data', () => {
    const wrapper = mount(UserInfo, {
      props: {
        user: mockUser,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('John Doe');
  });

  it('displays user name', () => {
    const wrapper = mount(UserInfo, {
      props: {
        user: mockUser,
      },
    });

    const nameSpan = wrapper.find('.font-medium');
    expect(nameSpan.text()).toBe('John Doe');
  });

  it('shows email when showEmail is true', () => {
    const wrapper = mount(UserInfo, {
      props: {
        user: mockUser,
        showEmail: true,
      },
    });

    expect(wrapper.text()).toContain('john@test.local');
  });

  it('hides email when showEmail is false', () => {
    const wrapper = mount(UserInfo, {
      props: {
        user: mockUser,
        showEmail: false,
      },
    });

    expect(wrapper.text()).not.toContain('john@test.local');
  });

  it('hides email by default', () => {
    const wrapper = mount(UserInfo, {
      props: {
        user: mockUser,
      },
    });

    expect(wrapper.text()).not.toContain('john@test.local');
  });

  it('shows avatar image when user has avatar', () => {
    const wrapper = mount(UserInfo, {
      props: {
        user: mockUser,
      },
    });

    const avatarImage = wrapper.find('.avatar-image');
    expect(avatarImage.exists()).toBe(true);
    expect(avatarImage.attributes('src')).toBe('https://test.local/avatar.jpg');
    expect(avatarImage.attributes('alt')).toBe('John Doe');
  });

  it('shows fallback initials when user has no avatar', () => {
    const wrapper = mount(UserInfo, {
      props: {
        user: mockUserWithoutAvatar,
      },
    });

    const avatarFallback = wrapper.find('.avatar-fallback');
    expect(avatarFallback.exists()).toBe(true);
    expect(avatarFallback.text()).toBe('JS');
  });

  it('shows fallback initials when avatar is empty string', () => {
    const wrapper = mount(UserInfo, {
      props: {
        user: { ...mockUser, avatar: '' },
      },
    });

    const avatarFallback = wrapper.find('.avatar-fallback');
    expect(avatarFallback.exists()).toBe(true);
    expect(avatarFallback.text()).toBe('JD');
  });

  it('applies correct styling to user name', () => {
    const wrapper = mount(UserInfo, {
      props: {
        user: mockUser,
      },
    });

    const nameSpan = wrapper.find('.font-medium');
    expect(nameSpan.classes()).toContain('truncate');
    expect(nameSpan.classes()).toContain('font-medium');
  });

  it('applies correct styling to email when shown', () => {
    const wrapper = mount(UserInfo, {
      props: {
        user: mockUser,
        showEmail: true,
      },
    });

    const emailSpan = wrapper.find('.text-muted-foreground');
    expect(emailSpan.classes()).toContain('text-muted-foreground');
    expect(emailSpan.classes()).toContain('truncate');
    expect(emailSpan.classes()).toContain('text-xs');
  });

  it('has correct container structure', () => {
    const wrapper = mount(UserInfo, {
      props: {
        user: mockUser,
      },
    });

    const container = wrapper.find('.grid');
    expect(container.exists()).toBe(true);
    expect(container.classes()).toContain('flex-1');
    expect(container.classes()).toContain('text-left');
    expect(container.classes()).toContain('text-sm');
    expect(container.classes()).toContain('leading-tight');
  });
});
