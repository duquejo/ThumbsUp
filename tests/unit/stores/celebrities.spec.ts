// stores/counter.spec.ts
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCelebritiesStore } from '@/stores/celebrities';

describe('+ Celebrities store', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setActivePinia(createPinia());
  });

  it('should retrieve the celebrities store data, setters and custom getters', () => {
    const { celebrities, celebrityVote, getCelebrityStatusById, getRandomCelebrity } = useCelebritiesStore();

    expect(celebrities).toBeInstanceOf(Array);
    expect(celebrityVote).toBeInstanceOf(Function);
    expect(getCelebrityStatusById).toBeInstanceOf(Function);
    expect(getRandomCelebrity).toBeInstanceOf(Object);
  });
  
  it('should retrieve a celebrity status', () => {
    const celebrities = useCelebritiesStore();
    const getterValue = celebrities.getCelebrityStatusById(1);
    expect(getterValue).toBe('negative');
    
    const getterValueNegative = celebrities.getCelebrityStatusById(2);
    expect(getterValueNegative).toBe('positive');
  });
  
  it('should throw an error if the user doesn\'t exists', () => {
    const celebrities = useCelebritiesStore();
    try {
      celebrities.getCelebrityStatusById(12345);
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Celebrity not found');
    }
  });

  it('should add one to a defined vote', () => {
    const celebIndexToUpdate = 0;
    const celebrities = useCelebritiesStore();
    const actualVotes = celebrities.celebrities[celebIndexToUpdate].votes.positive;
    celebrities.celebrityVote(celebIndexToUpdate, 'positive');
    const newVotes = celebrities.celebrities[celebIndexToUpdate].votes.positive;
    expect(newVotes).toBeGreaterThan(actualVotes);
  })
})