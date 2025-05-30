import { Priority, Todo } from '@/types/Todo';
import React, { createContext, ReactNode, useState } from 'react';
import uuid from 'react-native-uuid';

// Context & Provider 정의
interface TodoContextProps {
  todos: Todo[];
  addTodo: (text: string, priority: Priority) => void;
  toggleDone: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: '우측의 네모를 눌러 완료!', priority: 'high', done: true },
    { id: '2', text: '길게 눌러 순서 변경!', priority: 'medium', done: false },
    { id: '3', text: '왼쪽으로 스와이프 하여 삭제!', priority: 'low', done: false },
  ]);

  const addTodo = (text: string, priority: Priority) => {
    if (!text.trim()) {
      console.warn('빈 할 일은 추가할 수 없습니다.');
      return;
    }

    const newTodo: Todo = {
      id: uuid.v4().toString(), // 고유 ID 생성
      text,
      priority,
      done: false,
    };

    setTodos(prev => [...prev, newTodo]);
    console.log(`➕ addTodo: ${text} - `, priority);
  };

  const deleteTodo = (todo: Todo) => {
    setTodos(prev => prev.filter(data => data.id !== todo.id));
    console.log("🗑️ deleteTodo: ", todo);
  };

  const toggleDone = (todo: Todo) => {
    setTodos(prev =>
      prev.map(data => (data.id === todo.id ? {...data, done: !data.done} : data))
    );
    console.log("🔄 toggleDone: ", todo);
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, toggleDone }}>
      {children}
    </TodoContext.Provider>
  );
}


export { TodoProvider, TodoContext };
