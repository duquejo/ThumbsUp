import { describe, it, expect, beforeEach } from 'vitest';
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
  
  it('should close the message box after click', async () => {
    const buttonTimes = wrapper.find('button.icon-button');
    expect(buttonTimes.isVisible()).toBeTruthy();

    await buttonTimes.trigger('click');

    expect(wrapper.find('.banner-top').exists()).toBeFalsy();
  });
});
