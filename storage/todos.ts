import { StorageKeys } from '@/constants/StorageKeys';
import { Todo } from '@/types/Todo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTodos = async (todos: Todo[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(StorageKeys.TODOS, JSON.stringify(todos));
  } catch (error) {
    console.error('Failed to save todos:', error);
  }
};

export const loadTodos = async (): Promise<Todo[] | null> => {
  try {
    const savedTodos = await AsyncStorage.getItem(StorageKeys.TODOS);
    return savedTodos ? JSON.parse(savedTodos) : null;
  } catch (error) {
    console.error('Failed to load todos:', error);
    return null;
  }
};
