import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { setActivePinia, createPinia, storeToRefs } from 'pinia';
import { useCelebritiesStore } from '@/stores/useCelebritiesStore';
import { data } from '@/shared/data.json';

describe('+ useCelebritiesStore unit tests', () => {

  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

  beforeEach(() => {
    vi.clearAllMocks();
    setActivePinia(createPinia());
  });

  afterEach(() => {
    localStorage.clear();
    setItemSpy.mockClear();
  });

  it('should retrieve the celebrities store data, setters and custom getters', () => {
    const store = useCelebritiesStore();
    const { celebrities } = storeToRefs(store);

    expect(celebrities.value).toBeInstanceOf(Array);
    expect(store.celebrityVote).toBeInstanceOf(Function);
  });

  it('should set a predefined store dynamically', () => {
    const store = useCelebritiesStore();
    const { celebrities } = storeToRefs(store);
    store.setCelebritiesState(data); // Mocked state.

    expect(celebrities.value).toEqual(data);
    expect(setItemSpy).toHaveBeenCalledTimes(2);
    expect(setItemSpy).toHaveBeenCalledWith('celebrities', JSON.stringify(data));
    expect(setItemSpy).toHaveBeenCalledWith('celebrities_expires_in', expect.any(String));
  });

  it('should add one to a defined vote', () => {
    const celebIndexToUpdate = 0;
    const store = useCelebritiesStore();
    const { celebrities } = storeToRefs(store);
    store.setCelebritiesState(data); // Mocked state.
    const actualVotes = celebrities.value[celebIndexToUpdate].votes.positive;
    store.celebrityVote(celebIndexToUpdate, 'positive');
    const newVotes = celebrities.value[celebIndexToUpdate].votes.positive;

    expect(newVotes).toBeGreaterThan(actualVotes);

    expect(setItemSpy).toHaveBeenCalledTimes(4); // 2 - set / 2 vote.
  })
})