import { VueWrapper, shallowMount } from '@vue/test-utils';
import CardComponentVue from '@/components/card/CardComponent.vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { useCelebritiesStore } from '@/stores/celebrities';
import { data } from '@/data.json'

vi.mock('@/stores/celebrities', () => ({
  useCelebritiesStore: vi.fn(() => ({
    getCelebrityStatusById: (id: number) => {
      return {
        value: 'positive',
      };
    },
  }))
}));

describe('+ CardComponent unit tests', () => {

  const properties = {
    celebrity: data[0]
  };

  let wrapper: VueWrapper;

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = shallowMount(CardComponentVue, {
      props: {  ...properties },
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn(),
        })],
      },
    });
  });

  it('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should set by default grid mode - No class added', () => {
    const container = wrapper.find('.layered');
    expect(container.exists()).toBeFalsy();
  });

  it('should set by default grid mode - Layered class added', () => {
    const layeredWrapper = shallowMount(CardComponentVue, {
      props: {  ...properties, isLayered: true },
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn(),
        })],
      },
    });
    expect(layeredWrapper.html()).toMatchSnapshot();

    const container = layeredWrapper.find('.layered');

    expect(container.exists()).toBeTruthy();
  });
});