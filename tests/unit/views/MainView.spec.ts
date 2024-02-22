import { describe, it, expect, beforeEach, vi } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import MainViewVue from '@/views/MainView.vue';

describe('+ MainView unit test', () => {

  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(MainViewVue);
  });
  
  it('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
