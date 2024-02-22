<template>
  <li class="card card__background" :style="cardBackground" :class="layoutHandler">
    <!-- General card container -->
    <div class="card__container">
      <span class="card__icon">
        <button
          v-if="getCelebrityStatusById(props.celebrity.id) === 'positive'"
          class="icon-button card-thumb-button"
          aria-label="thumbs up"
        >
          <img src="/assets/img/thumbs-up.svg" alt="thumbs up" />
        </button>
        <button
          v-else-if="getCelebrityStatusById(props.celebrity.id) == 'negative'"
          class="icon-button card-thumb-button"
          aria-label="thumbs down"
        >
          <img src="/assets/img/thumbs-down.svg" alt="thumbs down" />
        </button>
      </span>

      <!-- Central card container -->
      <div class="card__content">
        <!-- Main info -->
        <div class="card__content-top">
          <span class="card__title">{{ props.celebrity.name }}</span>
          <p class="card__description truncate-overflow">{{ props.celebrity.description }}</p>
        </div>

        <!-- Actions -->
        <div class="card__content-bottom">
          <!-- Vote action container -->
          <ThumbButtonsComponent
            :last-updated="props.celebrity.lastUpdated"
            :category="props.celebrity.category"
            :id="props.celebrity.id"
          />
        </div>
      </div>
      <div class="card__gap"></div>
    </div>

    <!-- Thumbs gauge percentage -->
    <ThumbGaugeComponent :votes="props.celebrity.votes" />
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ICelebrity } from '@/interfaces/Celebrities';
import ThumbGaugeComponent from '@/components/thumb-gauge/ThumbGaugeComponent.vue';
import ThumbButtonsComponent from '@/components/thumb-buttons/ThumbButtonsComponent.vue';
import { useCelebritiesStore } from '@/stores/celebrities';

const { getCelebrityStatusById } = useCelebritiesStore();

interface Props {
  celebrity: ICelebrity;
  isLayered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isLayered: false,
});

const layoutHandler = computed(() => ({
  layered: props.isLayered,
}));

const cardBackground = computed(() => ({
  background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), no-repeat url('../assets/img/${props.celebrity.picture}.png')`,
  backgroundSize: 'cover',
}));
</script>

<style scoped lang="scss">
.card {
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  height: 300px;
  max-width: 300px;
  justify-content: flex-end;
  position: relative;
  row-gap: 1.2rem;

  @media all and (min-width: 767px) {
    max-width: 100%;
    row-gap: 1.5rem;
  }

  &.card__background {
    position: relative;
  }

  &__container {
    column-gap: 8px;
    display: flex;
    justify-content: space-between;
    z-index: 1;
  }

  &__icon {
    flex-grow: 0;
    height: 1.875rem;
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
    row-gap: 20.8px;

    @media all and (min-width: 767px) {
      row-gap: 1rem;
    }

    &-top {
      display: flex;
      flex-direction: column;
      row-gap: 20.8px;

      @media all and (min-width: 767px) {
        row-gap: 1rem;
      }
    }

    &-bottom {
      display: flex;
      flex-direction: column;
      row-gap: 20.8px;

      @media all and (min-width: 1100px) {
        row-gap: 1rem;
      }
    }
  }

  &__title {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    font-size: 30px;
    font-weight: 400;
    line-height: 36px;
    overflow: hidden;
  }

  &__description {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
    margin: 0;
    overflow: hidden;
    padding: 0;
  }

  &.layered {
    max-width: 100%;
    height: 138px;

    @media all and (min-width: 1100px) {
      height: 170px;
    }

    &.card__background {
      background-size: contain !important;
      background-color: gray;

      &::after {
        position: absolute;
        content: '';
        background: rgb(110, 110, 110);
        background: linear-gradient(
          90deg,
          rgba(110, 110, 110, 0) 10%,
          rgb(122, 122, 122) 15%,
          rgb(77, 77, 77) 50%,
          rgba(122, 122, 122, 1) 80%
        );
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
      font-size: 30px;
      font-weight: 400;
      line-height: 36px;
      overflow: hidden;
    }

    .card__content {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      column-gap: 19.2px;
      justify-content: space-around;

      @media all and (min-width: 767px) {
        justify-content: space-between;
        align-items: flex-start;
        margin: auto 1.5rem;
      }

      &-top {
        flex-basis: 60%;
      }
    }
  }
}
</style>
