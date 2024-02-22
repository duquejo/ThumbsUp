<template>
  <!-- Eyebrow data -->
  <EyebrowComponent
    v-if="state !== 'done'"
    :last-updated="props.lastUpdated"
    :category="props.category"
  />
  <span v-else class="eyebrow">Thank you for voting!</span>
  <div class="card__thumbs-container">
    <button
      v-if="state !== 'done'"
      class="icon-button card-thumb-button"
      :class="{ selected: vote === 'positive' }"
      aria-label="thumbs up"
      @click="onHandleState('positive')"
    >
      <img src="/assets/img/thumbs-up.svg" alt="thumbs up" />
    </button>
    <button
      v-if="state !== 'done'"
      class="icon-button card-thumb-button"
      :class="{ selected: vote === 'negative' }"
      aria-label="thumbs down"
      @click="onHandleState('negative')"
    >
      <img src="/assets/img/thumbs-down.svg" alt="thumbs down" />
    </button>
    <button
      type="submit"
      :disabled="state === 'idle'"
      :title="state === 'idle' ? 'You must thumb up/down first' : 'Click to vote'"
      @click="onHandleSubmit"
      v-text="dynamicSubmitText"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import EyebrowComponent from '@/components/eyebrow/EyebrowComponent.vue';
import type { VoteTypes } from '@/stores/celebrities';
import { useCelebritiesStore } from '@/stores/celebrities';

const { celebrityVote } = useCelebritiesStore();

interface Props {
  lastUpdated: string;
  category: string;
  id: number;
}

const props = defineProps<Props>();

type StateTypes = 'idle' | 'ready' | 'done';

const state = ref<StateTypes>('idle');
const vote = ref<VoteTypes>();

const onHandleState = (selection: VoteTypes) => {
  state.value = 'ready';
  vote.value = selection;
};

const onHandleSubmit = () => {
  if (state.value === 'done') {
    state.value = 'idle';
    vote.value = undefined;
    return;
  }

  if (vote.value) {
    state.value = 'done';
    celebrityVote(props.id, vote.value);
  }
};

const dynamicSubmitText = computed(() => {
  const map: Record<StateTypes, string> = {
    idle: 'Vote now',
    ready: 'Vote now',
    done: 'Vote again',
  };
  return map[state.value];
});
</script>

<style scoped>
.card__thumbs-container {
  align-items: center;
  column-gap: 0.5rem;
  display: flex;
  height: 30px;
  justify-content: flex-end;

  button[type='submit'] {
    background: var(--color-darker-background);
    border: 2px solid var(--color-white);
    color: var(--color-white);
    font-size: 1rem;
    font-weight: 400;
    height: 38px;
    width: 107px;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }
}
</style>
