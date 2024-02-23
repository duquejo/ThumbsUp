import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getCelebrities, postCelebrityVote } from '@/api/celebritiesApi';
import type { VoteTypes } from '@/stores/useCelebritiesStore';

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
}));

vi.mock('axios', async(importActual) => {
  const actual = await importActual<typeof import ('axios')>();
  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
        post: mocks.post,
      })),
    },
  };
  return mockAxios;
});

describe('+ getCelebrities', () => {

  const expectedMessage = {
    id: 0,
    name: 'John Doe'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches celebrities successfully from an API', async () => {
    mocks.get.mockResolvedValue({ data: expectedMessage });

    const result = await getCelebrities();

    expect(result).toBe(expectedMessage);
    expect(mocks.get).toHaveBeenCalled();
    expect(mocks.get).toHaveBeenCalledWith('');
  });

  it('should post a valid vote to the API', async () => {
    mocks.post.mockResolvedValue({ data: expectedMessage });

    const params = {id: 0, vote: 'negative'};
    const result = await postCelebrityVote(params.id, params.vote as VoteTypes);

    expect(result).toBe(expectedMessage);
    expect(mocks.post).toHaveBeenCalled();
    expect(mocks.post).toHaveBeenCalledWith('', { id: String(params.id), vote: params.vote});
  });

  it('should catch any error from the getCelebrities API', async () => {

    const errorMock = vi.spyOn(global.console, 'error');
    const expectedError = {
      data: 'Something happened',
      status: 500,
    };
    mocks.get.mockRejectedValue({
      response: expectedError,
    });

    try {
      await getCelebrities();
    } catch (error) {
      expect(errorMock).toHaveBeenCalled();
      expect(errorMock).toHaveBeenCalledWith(expectedError);
    }
    
    expect(mocks.get).toHaveBeenCalled();
    expect(mocks.get).toHaveBeenCalledWith('');
  });

  it('should catch any error from the postCelebrityVote API', async () => {

    const errorMock = vi.spyOn(global.console, 'error');
    const expectedError = {
      data: 'Something happened',
      status: 500,
    };
    const params = {id: 0, vote: 'negative'};
    mocks.post.mockRejectedValue({
      response: expectedError,
    });

    try {
      await postCelebrityVote(params.id, params.vote as VoteTypes);
    } catch (error) {
      expect(errorMock).toHaveBeenCalled();
      expect(errorMock).toHaveBeenCalledWith(expectedError);
    }
    
    expect(mocks.post).toHaveBeenCalled();
    expect(mocks.post).toHaveBeenCalledWith('', { id: String(params.id), vote: params.vote});
  });
});