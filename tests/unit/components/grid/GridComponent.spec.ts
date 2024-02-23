import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import GridComponentVue from '@/components/grid/GridComponent.vue';
import CardComponentVue from '@/components/card/CardComponent.vue';
import SelectComponentVue from '@/components/select/SelectComponent.vue';
import { useCelebritiesStore } from '@/stores/celebrities';
import { data } from '@/data.json';

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

    const store = useCelebritiesStore();
    store.celebrities = data;
  });

  it('should render as expected', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render expected child components', () => {
    expect(wrapper.findComponent(SelectComponentVue).exists()).toBeTruthy();
    expect(wrapper.findAllComponents(CardComponentVue).length).toBeGreaterThan(0);
  });
});
