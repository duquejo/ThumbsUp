import { ref } from 'vue';
import useLocalStorage from '@/composables/useLocalStorage';
import { useCelebritiesStore } from '@/stores/useCelebritiesStore';
import type { ICelebrity } from '@/interfaces/Celebrities';
import { getCelebrities } from '@/api/celebritiesApi';
import { data } from '@/data.json';

const useDataLoader = () => {
  const { getItem } = useLocalStorage('celebrities');
  const store = useCelebritiesStore();

  const isDataLoaded = ref<boolean>(false);

  return {
    isDataLoaded,
    loadData: async () => {
      const cacheData: ICelebrity[] = getItem<ICelebrity>();
      if (cacheData.length === 0) {

        let freshData;
        if ( ! [ 'development', 'test' ].includes(import.meta.env.MODE) ) {
          freshData = await getCelebrities();
        } else {
          freshData = data;
        }
        if (freshData) {
          store.setCelebritiesState(freshData);
        }
      } else {
        store.setCelebritiesState(cacheData);
      }
      isDataLoaded.value = true;
    },
  };
};

export default useDataLoader;
