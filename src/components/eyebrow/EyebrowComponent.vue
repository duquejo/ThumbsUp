<template>
  <span class="eyebrow">
    <time>{{ readableDate }}</time> in <span>{{ props.category }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatDistanceToNow } from 'date-fns';

interface Props {
  lastUpdated: string;
  category: string;
}

const props = defineProps<Props>();

const readableDate = computed(() => formatDistanceToNow(props.lastUpdated, { addSuffix: true }));
</script>
