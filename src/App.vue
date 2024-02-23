<template>
  <transition v-show="isDataLoaded" name="slide-fade">
    <div>
      <NavigationComponent />
      <HeroComponent />
      <GeneralLayout>
        <MainView />
      </GeneralLayout>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import HeroComponent from '@/components/hero/HeroComponent.vue';
import NavigationComponent from '@/components/navigation/NavigationComponent.vue';
import MainView from '@/views/MainView.vue';
import GeneralLayout from '@/layouts/GeneralLayout.vue';
import useDataLoader from '@/composables/useDataLoader';

const { isDataLoaded, loadData } = useDataLoader();

onMounted(async () => {
  loadData();
});

</script>

<style scoped>
.slide-fade-enter-active {
  transition: opacity 0.5s ease;
}

.slide-fade-enter {
  transition: opacity 0.5s ease;
}

.slide-fade-leave-active {
  transition: opacity 0.5s ease;
}

.slide-fade-leave-to,
.slide-fade-enter-from {
  transform: translateX(10px);
  opacity: 0;
}
</style>
