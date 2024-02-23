<template>
  <main role="main">
    <div class="main__header">
      <span class="main__header-title">Previous Rulings</span>
      <div class="main__header-select">
        <SelectComponent :options="['list', 'grid']" :default="selectedOption" @input="onChangeSelect" />
      </div>
    </div>
    <ol class="main__container" :class="layeredClasses" v-if="celebrities.length > 0">
      <CardComponent
        v-for="celeb in celebrities"
        :key="celeb.id"
        :celebrity="celeb"
        :is-layered="selectedOption === 'list'"
      />
    </ol>
    <p v-else>There aren't enough celebrities... soon.</p>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useCelebritiesStore } from '@/stores/useCelebritiesStore';
import CardComponent from '@/components/card/CardComponent.vue';
import SelectComponent from '@/components/select/SelectComponent.vue';
import { useBreakpoints } from '@/composables/useBreakPoints';

const store = useCelebritiesStore();

const { type } = useBreakpoints();
const { celebrities } = storeToRefs(store);

const selectedOption = ref<string>('grid');

const layeredClasses = computed(() => ({
  layered: selectedOption.value === 'list' ? true : false,
}));

const onChangeSelect = (option: string) => {
  selectedOption.value = option;
};

watch(type, (value) => {
  if( value === 'xs') {
    selectedOption.value = 'grid';
  }
}, {immediate: true, deep: true});
</script>

<style scoped lang="scss">
main {
  .main {
    p {
      font-size: 1.5rem;
    }
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