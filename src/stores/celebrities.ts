import { computed, reactive, type ComputedRef } from 'vue';
import { defineStore } from 'pinia';
import { data } from '@/data.json';
import type { ICelebrity } from '@/interfaces/celebrities';

export type VoteTypes = 'positive' | 'negative';

export const useCelebritiesStore = defineStore('celebrities', () => {
  const celebrities = reactive<ICelebrity[]>(data);

  const getRandomCelebrity = computed<ICelebrity>(() => {
    const rand = Math.floor(Math.random() * celebrities.length);
    return celebrities[rand];
  });

  return {
    // State
    celebrities, 
    
    // Actions
    celebrityVote: (id: number, vote: VoteTypes) => {
      celebrities.map((celeb: ICelebrity) => {
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
    },

    getCelebrityStatusById: (id: number) => {
      const celebrity = celebrities.find((celeb: ICelebrity) => celeb.id === id);
      if (!celebrity) throw new Error('Celebrity not found');
      return celebrity.votes.positive >= celebrity.votes.negative ? 'positive' : 'negative';
    },
    
    // Getters
    getRandomCelebrity
  };
});
