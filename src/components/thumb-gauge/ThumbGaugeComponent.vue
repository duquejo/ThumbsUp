<template>
  <div class="card__thumbs-percentage">
    <div class="icon-values">
      <span
        ><img src="/assets/img/thumbs-up.svg" alt="thumbs down" />{{
          calculatedVotes.positive
        }}</span
      >
      <span
        >{{ calculatedVotes.negative }}<img src="/assets/img/thumbs-down.svg" alt="thumbs down"
      /></span>
    </div>
    <div class="icon-background">
      <span
        class="icon-percentage"
        aria-label="thumbs up"
        :style="{ width: calculatedVotes.positive }"
      ></span>
      <span
        class="icon-percentage"
        aria-label="thumbs down"
        :style="{ width: calculatedVotes.negative }"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IVotes } from '@/interfaces/Celebrities';

interface Props {
  votes?: IVotes;
}

const props = withDefaults(defineProps<Props>(), {
  votes: () => ({
    positive: 0,
    negative: 0,
  }),
});

const calculatedVotes = computed(() => {
  const totalOfVotes = props.votes.positive + props.votes.negative;

  if (totalOfVotes === 0) {
    return {
      positive: '0%',
      negative: '0%',
    };
  }

  const positiveCount = Math.round((props.votes.positive / totalOfVotes) * 100);
  const negativeCount = Math.round((props.votes.negative / totalOfVotes) * 100);
  return {
    positive: `${positiveCount}%`,
    negative: `${negativeCount}%`,
  };
});
</script>

<style scoped>
.card__thumbs-percentage {
  height: 2.25rem;
  position: relative;

  .icon-values {
    align-items: center;
    display: flex;
    font-size: 1.125rem;
    gap: 1rem;
    height: 100%;
    justify-content: space-between;
    padding: 0.3rem 0.6rem;
    position: relative;
    z-index: 2;

    span {
      align-content: end;
      display: flex;
      gap: 0.5rem;
      height: 100%;
      z-index: 2;
    }

    img {
      width: 15px;
    }
  }

  .icon-background {
    bottom: 0;
    display: flex;
    height: 2.25rem;
    justify-content: space-between;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 1;

    .icon-percentage {
      &[aria-label='thumbs up'] {
        background-color: rgba(var(--color-green-positive), 0.6);
        justify-content: flex-start;
      }

      &[aria-label='thumbs down'] {
        background-color: rgba(var(--color-yellow-negative), 0.6);
        justify-content: flex-end;
      }
    }
  }
}
</style>
