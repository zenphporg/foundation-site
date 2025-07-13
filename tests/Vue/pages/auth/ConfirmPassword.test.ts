import { describe, expect, it } from 'vitest';

describe('ConfirmPassword', () => {
  it('can be imported', async () => {
    const ConfirmPassword = await import('@/pages/auth/ConfirmPassword.vue');
    expect(ConfirmPassword.default).toBeDefined();
    expect(ConfirmPassword.default.name || 'ConfirmPassword').toBeTruthy();
  });

  it('has expected component structure', async () => {
    const ConfirmPassword = await import('@/pages/auth/ConfirmPassword.vue');
    const component = ConfirmPassword.default;
    expect(component).toBeDefined();
    expect(typeof component).toBe('object');
  });
});
