import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import NavigationComponentVue from '@/components/navigation/NavigationComponent.vue';

describe('+ NavigationComponent unit tests', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(NavigationComponentVue);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
