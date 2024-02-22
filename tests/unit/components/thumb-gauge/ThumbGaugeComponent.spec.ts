import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import ThumbGaugeComponentVue from '@/components/thumb-gauge/ThumbGaugeComponent.vue';

describe('+ ThumbGaugeComponent unit tests', () => {

  const properties = {
    votes: {
      positive: 70,
      negative: 32
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render properly', () => {
    const wrapper = shallowMount(ThumbGaugeComponentVue);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render with the default props', () => {
    const wrapper = shallowMount(ThumbGaugeComponentVue);
    
    const thumbsValues = wrapper.findAll('.icon-values span');
    const thumbsBackground = wrapper.findAll('.icon-percentage');

    expect(thumbsValues[0].text()).toBe('0%');
    expect(thumbsValues[1].text()).toBe('0%');

    expect(thumbsBackground[0].attributes('style')).toBe('width: 0%;');
    expect(thumbsBackground[1].attributes('style')).toBe('width: 0%;');
  });

  it('should render with the given props', () => {
    const wrapper = shallowMount(ThumbGaugeComponentVue, {
      props: { ...properties }
    });
    expect(wrapper.html()).toMatchSnapshot();

    const thumbsValues = wrapper.findAll('.icon-values span');
    const thumbsBackground = wrapper.findAll('.icon-percentage');

    expect(thumbsValues[0].text()).not.toBe('0%');
    expect(thumbsValues[1].text()).not.toBe('0%');

    expect(thumbsBackground[0].attributes('style')).not.toBe('width: 0%;');
    expect(thumbsBackground[1].attributes('style')).not.toBe('width: 0%;');
  });

  it('should calculate correct percentages for positive and negative votes', async () => {
    const wrapper = mount(ThumbGaugeComponentVue, {
      props: { ...properties },
    });

    const thumbsValues = wrapper.findAll('.icon-values span');
    const thumbsBackground = wrapper.findAll('.icon-percentage');

    const totalOfVotes = properties.votes.positive + properties.votes.negative;

    const positiveCount = Math.round((properties.votes.positive / totalOfVotes) * 100);
    const negativeCount = Math.round((properties.votes.negative / totalOfVotes) * 100);

    expect(thumbsValues[0].text()).toBe(`${positiveCount}%`);
    expect(thumbsValues[1].text()).toBe(`${negativeCount}%`);

    expect(thumbsBackground[0].attributes('style')).toBe(`width: ${positiveCount}%;`);
    expect(thumbsBackground[1].attributes('style')).toBe(`width: ${negativeCount}%;`);
  });
});
