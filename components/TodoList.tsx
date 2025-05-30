import { useTodo } from '@/hooks/useTodo';
import { Todo } from '@/types/Todo';
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import TodoItem from './TodoItem';


const TodoList = () => {
  const { todos, reorderTodo } = useTodo();
  
  const renderItem = ({item, drag, isActive}: RenderItemParams<Todo>) => (
    <TouchableOpacity
      onLongPress={drag} // 길게 눌러서 드래그 시작
      delayLongPress={100}
      style={{
        opacity: isActive ? 0.5 : 1
      }}
    >
      <TodoItem {...item} />
    </TouchableOpacity>
  )

  useEffect(() => {
    console.log('🟡 [useTodo] 현재 할 일 목록:', todos);
  }, [todos])
  
  return (
    <DraggableFlatList
      data={todos}
      renderItem={(data) => renderItem(data)}
      keyExtractor={(item) => item.id}
      onDragEnd={(data) => reorderTodo(data.data)}
      scrollEnabled={false}
    />
  );
}

export default TodoList