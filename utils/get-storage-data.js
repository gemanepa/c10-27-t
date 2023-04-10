import AsyncStorage from '@react-native-async-storage/async-storage';

const getAsyncStorageData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

  return null;
};

export default getAsyncStorageData;
