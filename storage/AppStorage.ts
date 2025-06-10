import { APP_STORAGE_KEY } from '@/constants/StorageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppStorage = {
  isFirstLaunch: async (): Promise<boolean> => {
    try {
      const isFirstLaunch = await AsyncStorage.getItem(APP_STORAGE_KEY.FIRST_LAUNCH);
      return isFirstLaunch !== 'false';
    } catch (error) {
      console.error('Failed to check first launch:', error);
      return false;
    }
  },

  markFirstLaunch: async (): Promise<void> => {
    try {
      await AsyncStorage.setItem(APP_STORAGE_KEY.FIRST_LAUNCH, 'false');
    } catch (error) {
      console.error('Failed to mark first launch:', error);
    }
  },
};