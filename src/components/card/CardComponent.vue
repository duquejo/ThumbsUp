<template>
  <li class="card" :class="layoutHandler">
    <div class="card__container">
      <span class="card__icon">
        <button class="icon-button" aria-label="thumbs up">
          <img src="/assets/img/thumbs-up.svg" alt="thumbs up" />
        </button>
      </span>
      <div class="card__content">
        <span class="card__title">{{ props.celebrity.name }}</span>
        <p class="card__description truncate-overflow">{{ props.celebrity.description }}</p>
        <span class="card__last-updated">{{ props.celebrity.lastUpdated }}</span>
        <div class="card__thumbs-container">
          <button class="icon-button" aria-label="thumbs up">
            <img src="/assets/img/thumbs-up.svg" alt="thumbs up" />
          </button>
          <button class="icon-button" aria-label="thumbs down">
            <img src="/assets/img/thumbs-down.svg" alt="thumbs down" />
          </button>
          <button class="cta">Vote now</button>
        </div>
      </div>
      <div class="card__gap"></div>
    </div>

    <div class="card__thumbs-percentage">
      <div class="icon-values">
        <span><img src="/assets/img/thumbs-up.svg" alt="thumbs down" />25.5%</span>
        <span>74.5%<img src="/assets/img/thumbs-down.svg" alt="thumbs down" /></span>
      </div>
      <div class="icon-background">
        <span class="icon-percentage" aria-label="thumbs up" :style="{ width: '25.5%' }"></span>
        <span class="icon-percentage" aria-label="thumbs down" :style="{ width: '74.5%' }"></span>
      </div>
    </div>

    <img class="card__background" src="/assets/img/pope-francis.png" alt="Pope Francis" />
  </li>
</template>

<script setup lang="ts">
import type { ICelebrity } from '@/interfaces/Celebrities';
import { computed } from 'vue';

interface Props {
  celebrity: ICelebrity;
  isLayered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isLayered: true,
});

const layoutHandler = computed(() => ({
  'layered': props.isLayered,
}));
</script>

<style scoped lang="scss">
.card {
  background-color: #000;
  color: #FFF;
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: flex-end;
  max-width: 300px;
  position: relative;
  row-gap: 1rem;

  &.layered {
    max-width: 100%;

    &__container {
      
    }
  }

  &__background {
    height: 100%;
    left: 0;
    object-fit: cover;
    opacity: 0.6;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 0;
  }

  &__icon {
    flex-grow: 0;
    height: 30px;
  }

  &__gap {
    flex-grow: 1;
  }

  &__container {
    column-gap: 0.5rem;
    display: flex;
    justify-content: space-between;
    z-index: 1;
  }

  &__content {
    display: flex;
    flex-basis: 80%;
    flex-direction: column;
    flex-wrap: wrap;
    row-gap: 1.3rem;
  }

  &__thumbs-percentage {
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

      span{
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

  &__title {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    font-size: 1.875rem;
    font-weight: 400;
    line-height: 2.25rem;
    overflow: hidden;
  }

  &__description {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    font-size: .9375rem;
    font-weight: 400;
    line-height: 1.125rem;
    margin: 0;
    overflow: hidden;
    padding: 0;
  }

  &__last-updated {
    font-weight: 700;
    line-height: .9rem;
    text-align: right;
  }

  &__thumbs-container {
    align-items: center;
    column-gap: 0.5rem;
    display: flex;
    height: 30px;
    justify-content: flex-end;

    .cta {
      background: var(--color-darker-background);
      border: 2px solid #FFF;
      color: #FFF;
      font-size: 1rem;
      font-weight: 400;
      height: 38px;
      width: 107px;
    }
  }

  .icon-button {
    height: 100%;
    width: 30px;
    img {
      height: 1rem;
      max-width: 1rem;
      object-fit: cover;
    }
    &:hover {
      border: 2px solid #FFF;
    }
  }
}
</style>