import axios from 'axios';
import type { ICelebrity } from '@/interfaces/Celebrities';
import type { VoteTypes } from '@/stores/celebrities';

const baseURL = import.meta.env.VITE_CELEBRITIES_BASEURL;

const celebritiesApi = axios.create({
  baseURL,
});

export const getCelebrities = async () => {
  try {
    const { data } = await celebritiesApi.get<ICelebrity[]>('/list');
    return data;
  } catch (error: any) {
    console.error(error.response);
  }
};

export const postCelebrityVote = async (id: number, vote: VoteTypes) => {
  try {
    const { data } = await celebritiesApi.post<ICelebrity[]>('/save', { id: String(id), vote });
    return data;
  } catch (error: any) {
    console.error(error.response);
  }
};

export default celebritiesApi;
