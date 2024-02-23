import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import HeroComponentVue from '@/components/hero/HeroComponent.vue';
import { createTestingPinia } from '@pinia/testing';
import { useCelebritiesStore } from '@/stores/useCelebritiesStore';
import { data } from '@/data.json';

describe('+ HeroComponent unit tests', () => {

  let wrapper: VueWrapper;

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = shallowMount(HeroComponentVue, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn(),
        })],
      },
    });

    const store = useCelebritiesStore();
    store.celebrities = data;
  });

  it('should map the given fields', () => {
    expect(wrapper.html()).toBeDefined(); 

    expect(wrapper.find('h2').text()).toEqual(expect.any(String));
    expect(wrapper.find('.featured-card__more-info a').attributes('href')).toContain('wikipedia');
  });
});
