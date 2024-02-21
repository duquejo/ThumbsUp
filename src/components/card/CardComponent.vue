<template>
  <li class="card card__background" :class="layoutHandler">
    <div class="card__container">
      <span class="card__icon">
        <button class="icon-button" aria-label="thumbs up">
          <img src="/assets/img/thumbs-up.svg" alt="thumbs up" />
        </button>
      </span>

      <div class="card__content">
        <div class="card__content-top">
          <span class="card__title">{{ props.celebrity.name }}</span>
          <p class="card__description truncate-overflow">{{ props.celebrity.description }}</p>
        </div>
        <div class="card__content-bottom">
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
      </div>
      <div class="card__gap"></div>
    </div>

    <div class="card__thumbs-percentage">
      <div class="icon-values">
        <span><img src="/assets/img/thumbs-up.svg" alt="thumbs down" />{{ positiveVotesCalc }}</span>
        <span>{{ negativeVotesCalc }}<img src="/assets/img/thumbs-down.svg" alt="thumbs down" /></span>
      </div>
      <div class="icon-background">
        <span class="icon-percentage" aria-label="thumbs up" :style="{ width: positiveVotesCalc  }"></span>
        <span class="icon-percentage" aria-label="thumbs down" :style="{ width: negativeVotesCalc }"></span>
      </div>
    </div>
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
  isLayered: false,
});

const layoutHandler = computed(() => ({
  'layered': props.isLayered,
}));

const positiveVotesCalc = computed(() => `${ props.celebrity.votes.positive }%`);
const negativeVotesCalc = computed(() => `${ props.celebrity.votes.negative }%`);
</script>

<style scoped lang="scss">
.card {
  color: #FFF;
  display: flex;
  flex-direction: column;
  height: 300px;
  max-width: 300px;
  justify-content: flex-end;
  position: relative;
  row-gap: 1rem;

  @media (min-width: 768px) {
    max-width: 100%;
  }

  &.card__background {
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), no-repeat url('../assets/img/pope-francis.png');
    background-size: cover;
    position: relative;
  }

  &__container {
    column-gap: 0.5rem;
    display: flex;
    justify-content: space-between;
    z-index: 1;
  }

  &__icon {
    flex-grow: 0;
    height: 30px;
    pointer-events: none;
  }

  &__gap {
    flex-grow: 1;
  }


  &__content {
    display: flex;
    flex-basis: 80%;
    flex-direction: column;
    flex-grow: 1;
    row-gap: 1.3rem;

    &-top {
      display: flex;
      flex-direction: column;
      row-gap: 1.3rem;
    }

    &-bottom {
      display: flex;
      flex-direction: column;
      row-gap: 1.3rem;
    }
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
    transition: all 0.2s ease-in;
    border: 2px solid transparent;
    cursor: pointer;

    img {
      height: 1rem;
      max-width: 1rem;
      object-fit: cover;
    }

    &:hover {
      border: 2px solid #FFF;
    }
  }

  &.layered {
    max-width: 100%;
    height: 138px;

    @media all and (min-width: 1100px) {
      height: 170px;
    }

    &.card__background {
      background-size: contain;
      background-color: gray;

      &::after {
        position: absolute;
        content: '';
        background: rgb(110,110,110);
        background: linear-gradient(90deg, rgba(110,110,110,0) 10%, rgba(147,147,147,1) 20%, rgba(111,111,111,1) 50%, rgba(147,147,147,1) 80%);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }

    .card__gap {
      display: none;
    }

    .card__title {
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      display: -webkit-box;
      font-size: 1.875rem;
      font-weight: 400;
      line-height: 2.25rem;
      overflow: hidden;
    }

    .card__content {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      column-gap: 1.2rem;
      justify-content: space-around;
      
      &-top {
        flex-basis: 60%;
      }
    }
  }

}</style>