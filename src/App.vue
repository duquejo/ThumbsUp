<template>
  <NavigationComponent />
  <HeroComponent />
  <GeneralLayout>
    <MainView />
  </GeneralLayout>
</template>

<script setup lang="ts">
import HeroComponent from '@/components/hero/HeroComponent.vue';
import NavigationComponent from '@/components/navigation/NavigationComponent.vue';
import MainView from '@/views/MainView.vue';
import GeneralLayout from '@/layouts/GeneralLayout.vue';
</script>

<style scoped></style>
