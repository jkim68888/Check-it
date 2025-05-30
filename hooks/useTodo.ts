import { TodoContext } from '@/providers/TodoProvider';
import { useContext } from 'react';

export const useTodo = () => {
  const context = useContext(TodoContext);
  
  // 에러 처리
  if (!context) {
    throw new Error('TodoContext가 없습니다.');
  }

  return context;
};
