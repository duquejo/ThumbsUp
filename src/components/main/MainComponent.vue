<template>
  <main role="main">
    <div class="main__header">
      <span class="main__header-title">Previous Rulings</span>
      <select class="main__header-select">
        <option value="">List</option>
        <option value="">Grid</option>
      </select>
    </div>
    <ol class="main__container">
      <CardComponent v-for="celeb in celebs" :celebrity="celeb" />
    </ol>
  </main>
</template>

<script setup lang="ts">
import { data } from '@/data.json';
import { ref } from 'vue';
import type { ICelebrity } from '../../interfaces/Celebrities';
import CardComponent from '@/components/card/CardComponent.vue';

const celebs = ref<ICelebrity[]>(data);
</script>

<style scoped lang="scss">
main {
  .main {
    &__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 2rem;
      margin-bottom: 2rem;

      &-title {
        font-size: 1.5rem;
        font-weight: 300;
        line-height: 1.8rem;
      }
      &-select {
        width: 8.1875rem;
        height: 100%;
        border: 2px solid var(--color-darker-gray);
        text-align: center;
      }
    }

    &__container {
      display: grid;
      gap: 1rem;
      grid-auto-columns: minmax(300px, 1fr);
      grid-auto-flow: column;
      margin-top: 20px;
      overflow-x: scroll;
      
      @media (min-width: 768px) {
        display: grid;
        gap: 1rem;
        grid-auto-flow: row;
        margin-top: 20px;
        overflow: auto;
      }
    }
  }
}


</style>
