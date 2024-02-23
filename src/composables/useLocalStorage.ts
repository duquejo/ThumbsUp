const useLocalStorage = (key: string) => {
  return {
    saveItem: (data: any) => {

      const expire = 60;
      const now = Date.now();
      const schedule = now + expire * 1000;

      localStorage.setItem(key, JSON.stringify(data));
      localStorage.setItem(`${key}_expires_in`, String(schedule));

      console.log('Updated cache ⌚');
    },

    getItem: <T>(): T[] => {

      let result: T[] = [];

      const now = Date.now();
      let expiresIn = Number(localStorage.getItem(`${key}_expires_in`));
      if( ! expiresIn ) {
        expiresIn = 0;
      }

      if(expiresIn < now) {
        console.log('Loading fresh data 🍃');
        localStorage.removeItem(key);
        localStorage.removeItem(`${key}_expires_in`);
        return result;
      }

      console.log('Loading data from cache 🤖');
      const data = localStorage.getItem(key);
      if( data ) {
        result = JSON.parse(data);
      }
      return result;
    } 
  };
};

export default useLocalStorage;