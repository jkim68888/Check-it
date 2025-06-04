import { initialTodos } from '@/data/initialTodos';
import { TodoStorage } from '@/storage/todos';
import { Priority } from '@/types/Priority';
import { Todo } from '@/types/Todo';
import { TodoContainer } from '@/types/TodoContainer';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한글 locale 추가
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import uuid from 'react-native-uuid';

// dayjs를 한글로 설정
dayjs.locale('ko');

// Context & Provider 정의
interface TodoContextProps {
  todos: Todo[];
  todoContainers: TodoContainer[];
  addTodo: (text: string, priority: Priority, date: Date) => void;
  toggleDone: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
  deleteAllTodosByDate: (date: Date) => void;
  reorderTodo: (newTodos: Todo[]) => void;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoContainers, setTodoContainers] = useState<TodoContainer[]>([]);

  // AsyncStorage에서 데이터 불러오기
  useEffect(() => {
    const loadTodos = async () => {
      const savedTodos = await TodoStorage.getAll();

      if (savedTodos.length === 0) {
        setTodos(initialTodos);
      } else {
        setTodos(savedTodos);
      }
    };

    loadTodos();
  }, []);

  // todos가 변경될 때마다 AsyncStorage에 저장
  useEffect(() => {
    TodoStorage.save(todos);
  }, [todos]);

  // 과거 데이터 정리 및 컨테이너 업데이트
  useEffect(() => {
    const today = dayjs().startOf('day');
    
    // 과거 데이터 제거
    const filteredTodos = todos.filter(todo => {
      const todoDate = dayjs(todo.date).startOf('day');
      return todoDate.isSame(today) || todoDate.isAfter(today);
    });

    if (filteredTodos.length !== todos.length) {
      setTodos(filteredTodos);
    }

    // 날짜별 컨테이너 생성
    const containers: TodoContainer[] = [];
    
    // 오늘 컨테이너 추가
    containers.push({
      id: 'today',
      title: '오늘',
      subTitle: today.format('YYYY.M.D(dd)'),
      imageSource: require('../assets/images/pin.png'),
      date: today.toDate()
    });

    // 미래 날짜별 todo 그룹화
    const futureTodos = filteredTodos.filter(todo => 
      dayjs(todo.date).startOf('day').isAfter(today)
    );

    if (futureTodos.length > 0) {
      // 날짜별로 그룹화하고 정렬
      const dateGroups = futureTodos.reduce((groups: { [key: string]: Todo[] }, todo) => {
        const dateKey = dayjs(todo.date).startOf('day').format('YYYY-MM-DD');
        if (!groups[dateKey]) {
          groups[dateKey] = [];
        }
        groups[dateKey].push(todo);
        return groups;
      }, {});

      // 날짜별 컨테이너 생성
      Object.entries(dateGroups)
        .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
        .forEach(([dateStr, _]) => {
          const date = dayjs(dateStr);
          containers.push({
            id: dateStr,
            title: date.format('YYYY.M.D(dd)'),
            subTitle: '',
            imageSource: require('../assets/images/trashRed.png'),
            date: date.toDate()
          });
        });
    } else {
      // 미래 todo가 없으면 빈 미래 박스 추가
      containers.push({
        id: 'future',
        title: '미래',
        subTitle: '',
        imageSource: require('../assets/images/blank.png'),
        date: today.add(1, 'day').toDate()
      });
    }

    setTodoContainers(containers);
  }, [todos]);

  const addTodo = (text: string, priority: Priority, date: Date) => {
    if (!text.trim()) {
      console.warn('빈 할 일은 추가할 수 없습니다.');
      return;
    }

    const newTodo: Todo = {
      id: uuid.v4().toString(), // 고유 ID 생성
      order: todos.length,
      text,
      priority,
      date,
      done: false,
    };

    setTodos(prev => [...prev, newTodo]);
    console.log(`✅ add Todo: ${text} - `, priority);
  };

  const deleteTodo = async (todo: Todo) => {
    const updatedTodos = await TodoStorage.delete(todos, todo);
    setTodos(updatedTodos);
    console.log("❌ delete Todo: ", todo);
  };

  const deleteAllTodosByDate = (date: Date) => {
    const targetDate = dayjs(date).startOf('day');
    setTodos(prev => prev.filter(todo => {
      const todoDate = dayjs(todo.date).startOf('day');
      return !todoDate.isSame(targetDate);
    }));
    console.log("🗑️ delete all todos for date: ", targetDate.format('YYYY-MM-DD'));
  };

  const toggleDone = async (todo: Todo) => {
    const updatedTodos = await TodoStorage.toggle(todos, todo);
    setTodos(updatedTodos);
  };

  const reorderTodo = async (newTodos: Todo[]) => {
    // newTodos는 특정 날짜의 할 일들만 포함하고 있으므로, 
    // 해당 날짜 정보도 함께 전달
    const date = newTodos[0]?.date || '';
    const updatedTodos = await TodoStorage.reorder(todos, newTodos, date.toString());
    setTodos(updatedTodos);
  };

  return (
    <TodoContext.Provider value={{ 
      todos, 
      todoContainers,
      addTodo, 
      deleteTodo,
      deleteAllTodosByDate,
      toggleDone, 
      reorderTodo 
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
