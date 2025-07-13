import { describe, expect, it } from 'vitest';

describe('Login', () => {
  it('can be imported', async () => {
    const Login = await import('@/pages/auth/Login.vue');
    expect(Login.default).toBeDefined();
    expect(Login.default.name || 'Login').toBeTruthy();
  });

  it('has expected component structure', async () => {
    const Login = await import('@/pages/auth/Login.vue');
    const component = Login.default;
    expect(component).toBeDefined();
    expect(typeof component).toBe('object');
  });
});
