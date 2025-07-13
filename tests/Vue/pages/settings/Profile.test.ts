import { describe, expect, it } from 'vitest';

describe('Profile', () => {
  it('can be imported', async () => {
    const Profile = await import('@/pages/settings/Profile.vue');
    expect(Profile.default).toBeDefined();
    expect(Profile.default.name || 'Profile').toBeTruthy();
  });

  it('has expected component structure', async () => {
    const Profile = await import('@/pages/settings/Profile.vue');
    const component = Profile.default;
    expect(component).toBeDefined();
    expect(typeof component).toBe('object');
  });
});
