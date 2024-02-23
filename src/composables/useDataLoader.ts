import { ref } from 'vue';
import useLocalStorage from '@/composables/useLocalStorage';
import { useCelebritiesStore } from '@/stores/celebrities';
import type { ICelebrity } from '@/interfaces/Celebrities';
import { getCelebrities } from '@/api/celebritiesApi';


const useDataLoader = () => {

  const { getItem } = useLocalStorage('celebrities');
  const store = useCelebritiesStore();

  const isDataLoaded = ref<boolean>(false);

  return {
    isDataLoaded,
    loadData: async () => {
      const cacheData: ICelebrity[] = getItem<ICelebrity>();
      if (cacheData.length === 0) {
        const freshData = await getCelebrities();
        if (freshData) {
          store.setCelebritiesState(freshData);
        }
      } else {
        store.setCelebritiesState(cacheData);
      }
      isDataLoaded.value = true;
    }
  };
}

export default useDataLoader;