import { describe, it, expect, beforeEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import SelectComponentVue from '@/components/select/SelectComponent.vue';

describe('+ SelectComponent unit tests', () => {

  const allProperties = {
    options: ['one', 'two', 'three'],
    default: 'one',
    tabIndex: 0,
  };

  const requiredProperties = {
    options: ['foo', 'bar'],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render properly', () => {
    const wrapper = shallowMount(SelectComponentVue, {
      props: { ...allProperties }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render the given props', () => {
    const wrapper = shallowMount(SelectComponentVue, {
      props: { ...allProperties }
    });
    const opt = wrapper.findAll('.layout-select__items div');
    const selected = wrapper.find('.layout-select__selected');
    const select = wrapper.find('.layout-select');

    expect(opt).toHaveLength(allProperties.options.length);
    opt.forEach((opt, i) => expect(opt.text()).toBe(allProperties.options[i]));

    expect(selected.text()).toBe(allProperties.default);
    expect(select.attributes('tabindex')).toBe(String(allProperties.tabIndex));
  });

  it('should render the default props', () => {
    const wrapper = shallowMount(SelectComponentVue, {
      props: { ...requiredProperties }
    });
    expect(wrapper.html()).toMatchSnapshot();

    const opt = wrapper.findAll('.layout-select__items div');
    const selected = wrapper.find('.layout-select__selected');
    const select = wrapper.find('.layout-select');

    expect(opt).toHaveLength(requiredProperties.options.length);
    opt.forEach((opt, i) => expect(opt.text()).toBe(requiredProperties.options[i]));

    expect(selected.text()).toBe('');
    expect(select.attributes('tabindex')).toBe('0');
  });

  it('should change the selected item if an option is clicked', async () => {
    const wrapper = shallowMount(SelectComponentVue, {
      props: { ...allProperties }
    });

    const opt = wrapper.findAll('.layout-select__items div');
    const selected = wrapper.find('.layout-select__selected');

    await opt[2].trigger('click');

    expect(selected.text()).toBe(allProperties.options[2]);
  });

  it('should toggle the menu options correctly', async () => {
    const wrapper = shallowMount(SelectComponentVue, {
      props: { ...allProperties }
    });

    const select = wrapper.find('.layout-select__selected');
    const options = wrapper.find('.layout-select__items');

    await select.trigger('click');
    expect(options.classes('selectHide')).toBeFalsy();
    
    await select.trigger('click');
    expect(options.classes('selectHide')).toBeTruthy();
  });
});
