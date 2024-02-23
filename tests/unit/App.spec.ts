import { describe, it, expect, beforeEach, vi } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import AppVue from '@/App.vue';

describe('+ AppVue unit test', () => {

  let wrapper: VueWrapper;

  beforeEach(() => {
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
