import { computed, onMounted, onUnmounted, ref } from 'vue';

type BreakPointType = 'xs' | 'md' | 'lg';

export const useBreakpoints = () => {
  const windowWidth = ref(window.innerWidth);

  const onWidthChange = () => (windowWidth.value = window.innerWidth);

  onMounted(() => window.addEventListener('resize', onWidthChange));
  onUnmounted(() => window.removeEventListener('resize', onWidthChange));

  const type = computed<BreakPointType>(() => {
    if (windowWidth.value < 768) return 'xs';
    if (windowWidth.value >= 768 && windowWidth.value < 1100) return 'md';
    return 'lg';
  });

  return {
    type,
  };
};
