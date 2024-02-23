import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import FooterComponentVue from '@/components/footer/FooterComponent.vue';

describe('+ FooterComponent unit tests', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(FooterComponentVue);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
