import { describe, it, expect, beforeEach, vi } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import AppVue from '@/App.vue';

vi.mock('@/composables/useDataLoader', async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    isDataLoaded: true,
    loadData: vi.fn(),
  };
});

vi.mock('@/stores/useCelebritiesStore', () => ({
  useCelebritiesStore: vi.fn(() => ({
    setCelebritiesState: () => vi.fn()
  })),
}));

describe('+ AppVue unit test', () => {

  let wrapper: VueWrapper;

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = shallowMount(AppVue, {
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
});
