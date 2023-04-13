import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = (key, reload) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          const newVal = JSON.parse(value);
          if (data !== newVal) setData(newVal);
        }
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
      } finally {
        setLoading(false);
      }
    };

    retrieveData();
  }, [key, reload]); // eslint-disable-line react-hooks/exhaustive-deps

  return [loading, data];
};

export default useAsyncStorage;
