import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import HeroComponentVue from '@/components/hero/HeroComponent.vue';
import { createTestingPinia } from '@pinia/testing';
import { useCelebritiesStore } from '@/stores/useCelebritiesStore';
import { data } from '@/shared/data.json';
import { ref } from 'vue';

vi.mock('@/stores/useCelebritiesStore', () => ({
  useCelebritiesStore: vi.fn(() => ({
    celebrityVote: vi.fn(),
    celebrities: ref(data),
  }))
}));

const useCelebrityStoreMock = vi.mocked(useCelebritiesStore);

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
    const buttons = wrapper.findAll('.featured-card__buttons button');

    expect(wrapper.html()).toBeDefined(); 

    expect(wrapper.find('h2').text()).toEqual(expect.any(String));
    expect(wrapper.find('.featured-card__more-info a').attributes('href')).toContain('wikipedia');

    buttons.forEach(btn => expect(btn.attributes('disabled')).toBeFalsy());
  });

  it('should trigger the vote action', async () => {
    const buttons = wrapper.findAll('.featured-card__buttons button');

    await buttons[0].trigger('click');

    expect(buttons[0].attributes('disabled')).toBe('');
    expect(buttons[0].attributes('title')).toBe('You already voted, thank you');

    expect(buttons[1].attributes('disabled')).toBe('');
    expect(buttons[1].attributes('title')).toBe('You already voted, thank you');

    expect(useCelebrityStoreMock).toHaveBeenCalled();
  });
});
