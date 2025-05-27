import { Todo } from '@/types/Todo'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist'
import { SwipeListView } from 'react-native-swipe-list-view'

const initialTodos: Todo[] = [
  { id: '1', text: '우측의 네모를 눌러 완료!', priority: 'high', done: false },
  { id: '2', text: '길게 눌러 순서 변경!', priority: 'medium', done: true },
  { id: '3', text: '왼쪽으로 스와이프 하여 삭제!', priority: 'low', done: false },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return '#ffcdd2'
    case 'medium': return '#ffe0b2'
    case 'low': return '#bbdefb'
    default: return '#eeeeee'
  }
}

const TodoListBackup = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  const handleDelete = (id: string) => {
    Alert.alert('삭제', '할 일을 삭제할까요?', [
      { text: '취소', style: 'cancel' },
      { text: '삭제', onPress: () => setTodos(prev => prev.filter(todo => todo.id !== id)) },
    ])
  }

  const renderHiddenItem = (data: any) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(data.item.id)}
      >
        <Text style={styles.deleteText}>삭제</Text>
      </TouchableOpacity>
    </View>
  )

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Todo>) => (
    <TouchableOpacity
      style={[
        styles.todoItem,
        { backgroundColor: getPriorityColor(item.priority) },
        isActive && { opacity: 0.7 },
      ]}
      onLongPress={drag}
    >
      <Text style={[styles.todoText, item.done && styles.doneText]}>
        {item.text}
      </Text>
      <View style={styles.checkbox}>
        {item.done && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
  )

  return (
    <SwipeListView
      data={todos}
      renderItem={(data, rowMap) => (
        <DraggableFlatList
          data={todos}
          onDragEnd={({ data }) => setTodos(data)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-75}
      disableRightSwipe
      keyExtractor={(item) => item.id}
    />
  )
}

export default TodoListBackup

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 6,
    borderRadius: 8,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  doneText: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  checkmark: {
    fontSize: 16,
    color: 'green',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    width: 75,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#ddd',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
    borderRadius: 8,
    marginVertical: 6,
  },
})
