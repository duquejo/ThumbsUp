import { describe, it, expect, beforeEach, vi } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import EyebrowComponentVue from '@/components/eyebrow/EyebrowComponent.vue';
import { formatDistanceToNow } from 'date-fns';

vi.mock('date-fns', () => ({
  formatDistanceToNow: vi.fn(),
}));

const mockedFormatDistanceToNow = vi.mocked(formatDistanceToNow);

describe('+ EyebrowComponent unit test', () => {

  const properties = {
    category: 'entertainment',
    lastUpdated: '2020-03-10T23:08:57.892Z',
  };

  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(EyebrowComponentVue, {props: {  ...properties}});
  });
  
  it('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should map the given props', () => {
    const time = wrapper.find('.eyebrow time');
    const category = wrapper.find('.eyebrow span');

    mockedFormatDistanceToNow.mockReturnValueOnce('almost 4 years ago');

    expect(time.text()).toEqual(expect.any(String));
    expect(category.text()).toBe(properties.category);

    expect(mockedFormatDistanceToNow).toHaveBeenCalled();
    expect(mockedFormatDistanceToNow).toHaveBeenCalledWith(properties.lastUpdated, expect.any(Object));
  });
});
