import ThumbButtonsComponentVue from '@/components/thumb-buttons/ThumbButtonsComponent.vue';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { useCelebritiesStore } from '@/stores/useCelebritiesStore';

vi.mock('@/stores/useCelebritiesStore', () => ({
  useCelebritiesStore: vi.fn(() => ({
    celebrityVote: vi.fn()
  }))
}));

const useCelebrityStoreMock = vi.mocked(useCelebritiesStore);

describe('+ ThumbButtonsComponent unit tests', () => {

  const properties = {
    category: 'entertainment',
    lastUpdated: '2020-03-10T23:08:57.892Z',
    id: 1,
  };

  let wrapper: VueWrapper;

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = shallowMount(ThumbButtonsComponentVue, {
      props: {  ...properties },
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn(),
        })],
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render properly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should handle the buttons \'idle\' state', () => {
    expect(wrapper.html()).toMatchSnapshot();

    const buttons = wrapper.findAll('button');

    expect(buttons[0].attributes('aria-label')).toBe('thumbs up');
    expect(buttons[1].attributes('aria-label')).toBe('thumbs down');
    expect(buttons[2].attributes('title')).toBe('You must thumb up/down first');
    expect(buttons[2].attributes('disabled')).toBe('');
  });

  it('should handle the buttons \'ready\' state - Positive', async () => {
    const buttons = wrapper.findAll('button');

    await buttons[0].trigger('click');

    expect(wrapper.html()).toMatchSnapshot();

    expect(buttons[0].classes('selected')).toBeTruthy();
    expect(buttons[1].classes('selected')).toBeFalsy();
    expect(buttons[2].attributes('title')).toBe('Click to vote');
    expect(buttons[2].attributes('disabled')).toBeFalsy();
  });

  it('should handle the buttons \'ready\' state - Negative', async () => {
    const buttons = wrapper.findAll('button');

    await buttons[1].trigger('click');

    expect(wrapper.html()).toMatchSnapshot();

    expect(buttons[1].classes('selected')).toBeTruthy();
    expect(buttons[0].classes('selected')).toBeFalsy();
    expect(buttons[2].attributes('title')).toBe('Click to vote');
    expect(buttons[2].attributes('disabled')).toBeFalsy();
  });

  it('should handle the buttons \'done\' state', async () => {
    const buttons = wrapper.findAll('button');

    await buttons[0].trigger('click'); // Changing Idle state
    await buttons[2].trigger('click'); // Vote
    

    const eyebrow = wrapper.find('.eyebrow');
    const postClickButtons = wrapper.findAll('button');

    expect(wrapper.html()).toMatchSnapshot();

    expect(buttons[2].text()).toBe('Vote again');
    expect(eyebrow.text()).toBe('Thank you for voting!');

    expect(postClickButtons).toHaveLength(1);

    expect(useCelebrityStoreMock).toHaveBeenCalledTimes(1);
    expect(useCelebrityStoreMock).toHaveBeenCalledWith();
  });
});