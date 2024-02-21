<template>
  <main role="main">
    <div class="main__header">
      <span class="main__header-title">Previous Rulings</span>
      <select v-model="selected" class="main__header-select">
        <option value="list">List</option>
        <option value="grid">Grid</option>
      </select>
    </div>
    <ol class="main__container" :class="layeredClasses">
      <CardComponent v-for="celeb in celebs" :celebrity="celeb" :is-layered="selected === 'list'" />
    </ol>
  </main>
</template>

<script setup lang="ts">
import { data } from '@/data.json';
import { ref, computed } from 'vue';
import type { ICelebrity } from '../../interfaces/Celebrities';
import CardComponent from '@/components/card/CardComponent.vue';

const celebs = ref<ICelebrity[]>(data);
const selected = defineModel<'list'|'grid'>({ default: 'grid' });

const layeredClasses = computed(() => ({
  'layered': selected.value === 'list' ?  true : false,
}))
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
        border-radius: 0px;
        border: 2px solid var(--color-darker-gray);
        text-align: center;
        display: none;

        @media (min-width: 768px) {
          display: block;
        }
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
        grid-auto-flow: row;
        grid-auto-columns: auto;
        grid-template-columns: auto auto;
        overflow: auto;

        &.layered {
          grid-template-columns: auto;
        }
      }
    }
  }
}


</style>
