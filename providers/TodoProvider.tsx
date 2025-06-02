import { initialTodos } from '@/data/initialTodos';
import { Priority } from '@/types/Priority';
import { Todo } from '@/types/Todo';
import React, { createContext, ReactNode, useState } from 'react';
import uuid from 'react-native-uuid';

// Context & Provider 정의
interface TodoContextProps {
  todos: Todo[];
  addTodo: (text: string, priority: Priority) => void;
  toggleDone: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
  reorderTodo: (newTodos: Todo[]) => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (text: string, priority: Priority) => {
    if (!text.trim()) {
      console.warn('빈 할 일은 추가할 수 없습니다.');
      return;
    }

    const newTodo: Todo = {
      id: uuid.v4().toString(), // 고유 ID 생성
      order: todos.length,
      text,
      priority,
      done: false,
    };

    setTodos(prev => [...prev, newTodo]);
    console.log(`➕ add Todo: ${text} - `, priority);
  };

  const deleteTodo = (todo: Todo) => {
    setTodos(prev => prev.filter(data => data.id !== todo.id));
    console.log("🗑️ delete Todo: ", todo);
  };

  const toggleDone = (todo: Todo) => {
    setTodos(prev =>
      prev.map(data => (data.id === todo.id ? {...data, done: !data.done} : data))
    );
  };

  const reorderTodo = (newTodos: Todo[]) => {
    setTodos(newTodos.map((data, index) => ({...data, order: index})))
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, toggleDone, reorderTodo }}>
      {children}
    </TodoContext.Provider>
  );
}


export { TodoProvider, TodoContext };
