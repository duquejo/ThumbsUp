<template>
  <div class="layout-select" :tabindex="props.tabIndex" @blur="open = false">
    <div class="layout-select__selected" @click="open = !open">
      {{ selected }}
    </div>
    <div class="layout-select__items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  options: string[];
  default?: string | null;
  tabIndex?: number;
}

interface Emits {
  (e: 'input', option: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  default: null,
  tabIndex: 0,
});

const emit = defineEmits<Emits>();

const open = ref<boolean>(false);
const selected = ref<string | null>(props.default ? props.default : null);
</script>

<style scoped lang="scss">
.layout-select {
  position: relative;
  width: 100%;
  height: 100%;
  text-transform: capitalize;
  outline: none;
  padding-right: 1rem;
  font-size: 0.8438rem;
  line-height: 0.8438rem;
  border-radius: 0px;
  border: 2px solid var(--color-darker-gray);
  text-align: center;
  display: none;

  @media (min-width: 768px) {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__selected {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    user-select: none;
    width: 100%;
    height: 100%;

    &::after {
      position: absolute;
      content: '';
      top: 50%;
      transform: translateY(-50%);
      right: 1em;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-color: var(--color-darker-gray) transparent transparent transparent;
    }
  }

  &__items {
    background-color: var(--color-white);
    position: absolute;
    left: 0;
    top: 100%;
    right: 0;
    z-index: 2;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 2px solid var(--color-darker-gray);
      border-left: 2px solid var(--color-darker-gray);
      border-bottom: 2px solid var(--color-darker-gray);
      width: 100%;
      height: 32px;
      cursor: pointer;
      user-select: none;

      &:last-child {
        border-bottom: 2px solid var(--color-darker-gray);
      }

      &:first-child {
        border-top: 2px solid var(--color-darker-gray);
      }

      &:hover {
        background-color: var(--color-light-gray);
      }
    }
  }
}

.selectHide {
  display: none;
}
</style>
