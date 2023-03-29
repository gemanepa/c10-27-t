import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = (key) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setData(value);
        }
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
      } finally {
        setLoading(false);
      }
    };

    retrieveData();
  }, [key]);

  return [loading, data];
};

export default useAsyncStorage;
