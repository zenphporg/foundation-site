import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { describe, expect, it } from 'vitest';
import { mountComponent } from '../setup';

describe('Breadcrumbs', () => {
  it('renders correctly with breadcrumbs array', () => {
    const breadcrumbs = [{ title: 'Home', href: '/' }, { title: 'Dashboard', href: '/dashboard' }, { title: 'Current Page' }];

    const wrapper = mountComponent(Breadcrumbs, {
      props: { breadcrumbs },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('renders Breadcrumb component', () => {
    const breadcrumbs = [{ title: 'Home', href: '/' }];

    const wrapper = mountComponent(Breadcrumbs, {
      props: { breadcrumbs },
    });

    const breadcrumb = wrapper.findComponent({ name: 'Breadcrumb' });
    expect(breadcrumb.exists()).toBe(true);
  });

  it('renders BreadcrumbList component', () => {
    const breadcrumbs = [{ title: 'Home', href: '/' }];

    const wrapper = mountComponent(Breadcrumbs, {
      props: { breadcrumbs },
    });

    const breadcrumbList = wrapper.findComponent({ name: 'BreadcrumbList' });
    expect(breadcrumbList.exists()).toBe(true);
  });

  it('renders correct number of BreadcrumbItem components', () => {
    const breadcrumbs = [{ title: 'Home', href: '/' }, { title: 'Dashboard', href: '/dashboard' }, { title: 'Current Page' }];

    const wrapper = mountComponent(Breadcrumbs, {
      props: { breadcrumbs },
    });

    const breadcrumbItems = wrapper.findAllComponents({ name: 'BreadcrumbItem' });
    expect(breadcrumbItems).toHaveLength(3);
  });

  it('renders BreadcrumbLink for non-last items with href', () => {
    const breadcrumbs = [{ title: 'Home', href: '/' }, { title: 'Current Page' }];

    const wrapper = mountComponent(Breadcrumbs, {
      props: { breadcrumbs },
    });

    const breadcrumbLinks = wrapper.findAllComponents({ name: 'BreadcrumbLink' });
    expect(breadcrumbLinks).toHaveLength(1);
  });

  it('renders BreadcrumbPage for the last item', () => {
    const breadcrumbs = [{ title: 'Home', href: '/' }, { title: 'Current Page' }];

    const wrapper = mountComponent(Breadcrumbs, {
      props: { breadcrumbs },
    });

    const breadcrumbPages = wrapper.findAllComponents({ name: 'BreadcrumbPage' });
    expect(breadcrumbPages).toHaveLength(1);
  });

  it('renders Link components for items with href', () => {
    const breadcrumbs = [{ title: 'Home', href: '/' }, { title: 'Dashboard', href: '/dashboard' }, { title: 'Current Page' }];

    const wrapper = mountComponent(Breadcrumbs, {
      props: { breadcrumbs },
    });

    const links = wrapper.findAllComponents({ name: 'Link' });
    expect(links).toHaveLength(2); // Only first two items have href
  });

  it('renders correct separators between items', () => {
    const breadcrumbs = [{ title: 'Home', href: '/' }, { title: 'Dashboard', href: '/dashboard' }, { title: 'Current Page' }];

    const wrapper = mountComponent(Breadcrumbs, {
      props: { breadcrumbs },
    });

    const separators = wrapper.findAllComponents({ name: 'BreadcrumbSeparator' });
    expect(separators).toHaveLength(2); // n-1 separators for n items
  });

  it('displays correct titles for breadcrumb items', () => {
    const breadcrumbs = [{ title: 'Home', href: '/' }, { title: 'Dashboard', href: '/dashboard' }, { title: 'Current Page' }];

    const wrapper = mountComponent(Breadcrumbs, {
      props: { breadcrumbs },
    });

    expect(wrapper.text()).toContain('Home');
    expect(wrapper.text()).toContain('Dashboard');
    expect(wrapper.text()).toContain('Current Page');
  });

  it('handles single breadcrumb item correctly', () => {
    const breadcrumbs = [{ title: 'Single Page' }];

    const wrapper = mountComponent(Breadcrumbs, {
      props: { breadcrumbs },
    });

    const breadcrumbItems = wrapper.findAllComponents({ name: 'BreadcrumbItem' });
    expect(breadcrumbItems).toHaveLength(1);

    const separators = wrapper.findAllComponents({ name: 'BreadcrumbSeparator' });
    expect(separators).toHaveLength(0); // No separators for single item

    const breadcrumbPages = wrapper.findAllComponents({ name: 'BreadcrumbPage' });
    expect(breadcrumbPages).toHaveLength(1); // Single item should be a page
  });
});
