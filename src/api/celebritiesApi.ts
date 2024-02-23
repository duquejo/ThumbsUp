import axios from 'axios';
import type { ICelebrity } from '@/interfaces/Celebrities';
import type { VoteTypes } from '@/stores/useCelebritiesStore';

const celebritiesURL = import.meta.env.VITE_CELEBRITIES_URL;
const votesURL = import.meta.env.VITE_VOTES_URL;

const celebritiesApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCelebrities = async () => {
  try {
    const { data } = await celebritiesApi.get<ICelebrity[]>(celebritiesURL);
    return data;
  } catch (error: any) {
    console.error(error.response);
  }
};

export const postCelebrityVote = async (id: number, vote: VoteTypes) => {
  try {
    const { data } = await celebritiesApi.post<ICelebrity[]>(votesURL, { id: String(id), vote });
    return data;
  } catch (error: any) {
    console.error(error.response);
  }
};

export default celebritiesApi;
