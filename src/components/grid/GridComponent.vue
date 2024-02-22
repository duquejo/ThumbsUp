<template>
  <main role="main">
    <div class="main__header">
      <span class="main__header-title">Previous Rulings</span>
      <div class="main__header-select">
        <SelectComponent :options="['list', 'grid']" :default="selected" @input="onChangeSelect" />
      </div>
    </div>
    <ol class="main__container" :class="layeredClasses">
      <CardComponent v-for="celeb in celebs" :celebrity="celeb" :is-layered="selected === 'list'" />
    </ol>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ICelebrity } from '@/interfaces/celebrities';
import CardComponent from '@/components/card/CardComponent.vue';
import { useCelebritiesStore } from '@/stores/celebrities';
import SelectComponent from '@/components/select/SelectComponent.vue';

const { celebrities } = useCelebritiesStore();

const celebs = ref<ICelebrity[]>(celebrities);
const selected = ref<string>('grid');

const layeredClasses = computed(() => ({
  layered: selected.value === 'list' ? true : false,
}));

const onChangeSelect = (option: string) => {
  selected.value = option;
};
</script>

<style scoped lang="scss">
main {
  .main {
    &__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      height: 2rem;
      margin-bottom: 2rem;

      &-title {
        font-size: 1.5rem;
        font-weight: 300;
        line-height: 1.8rem;
      }

      &-select {
        width: 133px;
        height: 32px;
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
