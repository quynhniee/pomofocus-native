import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeItem = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getItem = async (key: string) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log(error);
    }
  };
  
  export const removeItem = async (key: string) => {
    try {
      return await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };