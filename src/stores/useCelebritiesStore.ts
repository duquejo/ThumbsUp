import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ICelebrity } from '@/interfaces/Celebrities';
import useLocalStorage from '@/composables/useLocalStorage';
import { postCelebrityVote } from '@/api/celebritiesApi';

export type VoteTypes = 'positive' | 'negative';

export const useCelebritiesStore = defineStore('celebrities', () => {
  const { saveItem } = useLocalStorage('celebrities');

  const celebrities = ref<ICelebrity[]>([]);

  return {
    // State
    celebrities,

    // Actions
    celebrityVote: (id: number, vote: VoteTypes) => {
      celebrities.value.map((celeb: ICelebrity) => {
        if (celeb.id === id) {
          return {
            ...celeb,
            votes: {
              positive: vote === 'positive' ? celeb.votes.positive++ : celeb.votes.positive,
              negative: vote === 'negative' ? celeb.votes.negative++ : celeb.votes.negative,
            },
          };
        }
        return celeb;
      });
      if( import.meta.env.VITE_VOTES_URL ) {
        postCelebrityVote(id, vote);
      }
      saveItem(celebrities.value);
    },
    setCelebritiesState: (newCelebs: ICelebrity[]) => {
      celebrities.value = newCelebs;
      saveItem(newCelebs);
    },
  };
});
