import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import GridComponentVue from '@/components/grid/GridComponent.vue';
import CardComponentVue from '@/components/card/CardComponent.vue';
import SelectComponentVue from '@/components/select/SelectComponent.vue';

describe('+ HeroComponent unit tests', () => {

  let wrapper: VueWrapper;

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = shallowMount(GridComponentVue, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn(),
        })],
      },
    });
  });

  it('should render as expected', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render expected child components', () => {
    expect(wrapper.findComponent(SelectComponentVue).exists()).toBeTruthy();
    expect(wrapper.findAllComponents(CardComponentVue).length).toBeGreaterThan(0);
  });
});
