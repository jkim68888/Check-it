import { Todo } from '@/types/Todo'
import React from 'react'
import { SwipeListView } from 'react-native-swipe-list-view'
import DeleteBox from './DeleteBox'
import TodoItem from './TodoItem'

const TodoList = () => {
  const initialTodos: Todo[] = [
    { id: '1', text: '우측의 네모를 눌러 완료!', priority: 'high', done: true },
    { id: '2', text: '길게 눌러 순서 변경!', priority: 'medium', done: false },
    { id: '3', text: '왼쪽으로 스와이프 하여 삭제!', priority: 'low', done: false },
  ]

  const renderHiddenItem = (item: Todo) => (
    <DeleteBox {...item} />
  )

  const renderItem = (item: Todo) => (
    <TodoItem {...item} />
  )
  
  return (
    <SwipeListView
      data={initialTodos}
      renderItem={(data) => renderItem(data.item)}
      renderHiddenItem={(data) => renderHiddenItem(data.item)}
      rightOpenValue={-53}
      disableRightSwipe
      keyExtractor={(item) => item.id}
    />
  );
}

export default TodoList