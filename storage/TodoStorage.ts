import { TODOS_STORAGE_KEY } from '@/constants/StorageKeys';
import { Todo } from '@/types/Todo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TodoStorage = {
  // 전체 데이터 조회
  getAll: async (): Promise<Todo[]> => {
    try {
      const todosJson = await AsyncStorage.getItem(TODOS_STORAGE_KEY);
      return todosJson ? JSON.parse(todosJson) : [];
    } catch (error) {
      console.error('Failed to load todos:', error);
      return [];
    }
  },

  // 할 일 목록 저장
  save: async (todos: Todo[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos:', error);
    }
  },

  // 할 일 삭제
  delete: async (allTodos: Todo[], todoToDelete: Todo): Promise<Todo[]> => {
    try {
      // 같은 날짜의 할 일들만 필터링
      const sameDateTodos = allTodos.filter(todo => todo.date === todoToDelete.date);
      const otherDateTodos = allTodos.filter(todo => todo.date !== todoToDelete.date);
      
      // 해당 날짜 내에서 삭제 처리
      const updatedDateTodos = sameDateTodos.filter(todo => todo.id !== todoToDelete.id);
      
      // 전체 todos 합치기
      const newTodos = [...otherDateTodos, ...updatedDateTodos];
      await TodoStorage.save(newTodos);
      return newTodos;
    } catch (error) {
      console.error('Failed to delete todo:', error);
      return allTodos;
    }
  },

  // 할 일 완료 상태 토글
  toggle: async (todos: Todo[], todoToToggle: Todo): Promise<Todo[]> => {
    try {
      const newTodos = todos.map(todo =>
        todo.id === todoToToggle.id ? { ...todo, done: !todo.done } : todo
      );
      await TodoStorage.save(newTodos);
      return newTodos;
    } catch (error) {
      console.error('Failed to toggle todo:', error);
      return todos;
    }
  },

  // 할 일 순서 변경
  reorder: async (allTodos: Todo[], newDateTodos: Todo[], date: string): Promise<Todo[]> => {
    try {
      // 다른 날짜의 할 일들 유지
      const otherDateTodos = allTodos.filter(todo => todo.date.toString() !== date);
      
      // 새로운 순서가 적용된 해당 날짜의 할 일들
      const orderedDateTodos = newDateTodos.map((todo, index) => ({
        ...todo,
        order: index,
      }));
      
      // 전체 todos 합치기
      const newTodos = [...otherDateTodos, ...orderedDateTodos];
      await TodoStorage.save(newTodos);
      return newTodos;
    } catch (error) {
      console.error('Failed to reorder todos:', error);
      return allTodos;
    }
  },
};
