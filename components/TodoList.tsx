import { useTodo } from '@/hooks/useTodo'
import { Todo } from '@/types/Todo'
import React, { useEffect } from 'react'
import { SwipeListView } from 'react-native-swipe-list-view'
import DeleteBox from './DeleteBox'
import TodoItem from './TodoItem'

const TodoList = () => {
  const { todos } = useTodo();
  
  const renderHiddenItem = (item: Todo) => (
    <DeleteBox {...item} />
  )

  const renderItem = (item: Todo) => (
    <TodoItem {...item} />
  )

  useEffect(() => {
    console.log('🟡 [useTodo] 현재 할 일 목록:', todos);
  }, [todos])
  
  return (
    <SwipeListView
      data={todos}
      renderItem={(data) => renderItem(data.item)}
      renderHiddenItem={(data) => renderHiddenItem(data.item)}
      rightOpenValue={-53}
      disableRightSwipe
      keyExtractor={(item) => item.id}
    />
  );
}

export default TodoList