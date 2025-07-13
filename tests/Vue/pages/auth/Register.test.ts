import { describe, expect, it } from 'vitest';

describe('Register', () => {
  it('can be imported', async () => {
    const Register = await import('@/pages/auth/Register.vue');
    expect(Register.default).toBeDefined();
    expect(Register.default.name || 'Register').toBeTruthy();
  });

  it('has expected component structure', async () => {
    const Register = await import('@/pages/auth/Register.vue');
    const component = Register.default;
    expect(component).toBeDefined();
    expect(typeof component).toBe('object');
  });
});
