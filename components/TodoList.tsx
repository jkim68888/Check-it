import { useTodo } from '@/hooks/useTodo';
import { Todo } from '@/types/Todo';
import dayjs from 'dayjs';
import React from 'react';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import TodoItem from './TodoItem';

interface TodoListProps {
  date: Date;
}

const TodoList = ({ date }: TodoListProps) => {
  const { todos, reorderTodo } = useTodo();
  
  // 해당 날짜의 todo만 필터링
  const filteredTodos = todos.filter(todo => 
    dayjs(todo.date).startOf('day').isSame(dayjs(date).startOf('day'))
  );

  const renderItem = ({item, drag, isActive}: RenderItemParams<Todo>) => (
    <TodoItem 
      todo={item}
      drag={drag}
      isActive={isActive}
    />
  )

  return (
    <DraggableFlatList
      data={filteredTodos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onDragEnd={(data) => reorderTodo(data.data)}
      scrollEnabled={false}
    />
  );
}

export default TodoList