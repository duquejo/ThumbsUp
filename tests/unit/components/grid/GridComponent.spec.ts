import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import GridComponentVue from '@/components/grid/GridComponent.vue';
import CardComponentVue from '@/components/card/CardComponent.vue';
import SelectComponentVue from '@/components/select/SelectComponent.vue';
import { useCelebritiesStore } from '@/stores/useCelebritiesStore';
import { data } from '@/shared/data.json';

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

  it('should render a default text of there are no celebrities loaded', () => {
    const store = useCelebritiesStore();
    store.celebrities = [];

    const modWrapper = shallowMount(GridComponentVue, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn(),
        })],
      },
    });

    expect(modWrapper.html()).toMatchSnapshot();
    expect(modWrapper.findComponent(SelectComponentVue).exists()).toBeTruthy();
    expect(modWrapper.find('p').text()).toBe('There aren\'t enough celebrities... soon.');
    expect(modWrapper.findAllComponents(CardComponentVue).length).toBe(0);
  });
});
