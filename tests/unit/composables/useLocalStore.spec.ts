import useLocalStorage from '@/composables/useLocalStorage';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('+ useLocalStorage unit tests', () => {
  
  const key = 'testKey';
  const expireKey = `${key}_expires_in`;
  const testData = [{ one: 'one', two: 'two', three: 'three' }];

  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');

  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  afterEach(() => {
    localStorage.clear();
  });

  it('should save data to localStorage', () => {
    const { saveItem } = useLocalStorage(key);

    saveItem(testData);

    expect(setItemSpy).toHaveBeenCalledTimes(2);
    expect(setItemSpy).toHaveBeenCalledWith(key, JSON.stringify(testData));
    expect(setItemSpy).toHaveBeenCalledWith(expireKey, expect.any(String));
  });

  it('should retrieve data from localStorage', () => {
    const { getItem } = useLocalStorage(key);

    const arrayString = getItem<string>();

    expect(arrayString).toEqual([]);
    expect(getItemSpy).toHaveBeenCalledTimes(1);
    expect(getItemSpy).toHaveBeenCalledWith(expireKey);
  });
});