import { ref } from 'vue';
import useLocalStorage from '@/composables/useLocalStorage';
import { useCelebritiesStore } from '@/stores/useCelebritiesStore';
import type { ICelebrity } from '@/interfaces/Celebrities';
import { getCelebrities } from '@/api/celebritiesApi';

const retrieveDataSource = async () => {
  let sourceData;
  if ( import.meta.env.VITE_CELEBRITIES_URL !== '' ) {
    sourceData = await getCelebrities();
  } else {
    sourceData = (await import('@/shared/data.json')).data;
  }
  if(!sourceData) {
    return [];
  }
  return sourceData;
}

const useDataLoader = () => {
  const { getItem } = useLocalStorage('celebrities');
  const store = useCelebritiesStore();

  const isDataLoaded = ref<boolean>(false);

  return {
    isDataLoaded,
    loadData: async () => {
      const cacheData: ICelebrity[] = getItem<ICelebrity>();
      if (cacheData.length === 0) {
        store.setCelebritiesState( await retrieveDataSource());
      } else {
        store.setCelebritiesState(cacheData);
      }
      isDataLoaded.value = true;
    },
  };
};

export default useDataLoader;
