import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import { Todo } from '@/types/Todo'
import React from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RenderItemParams } from 'react-native-draggable-flatlist'
import { SwipeListView } from 'react-native-swipe-list-view'
import Typo from './Typo'

const TodoList = () => {
  const initialTodos: Todo[] = [
    { id: '1', text: '우측의 네모를 눌러 완료!', priority: 'high', done: false },
    { id: '2', text: '길게 눌러 순서 변경!', priority: 'medium', done: true },
    { id: '3', text: '왼쪽으로 스와이프 하여 삭제!', priority: 'low', done: false },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return Colors.high
      case 'medium': return Colors.middle
      case 'low': return Colors.low
      default: return Colors.low
    }
  }

  const handleOrder = () => {
    
  }

  const handleDelete = () => {
    Alert.alert('삭제', '할 일을 삭제할까요?', [
      { text: '취소', style: 'cancel' },
      { text: '삭제', onPress: () => {} },
    ])
  }

  const renderHiddenItem = (data: any) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {}}
      >
        <Image source={require('../assets/images/delete.png')} />
      </TouchableOpacity>
    </View>
  )

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Todo>) => (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: getPriorityColor(item.priority) }
        ]}
        onLongPress={drag}
      >
        <Typo family={Fonts.Pretendard.medium} color={Colors.gray666} size={12}>{item.text}</Typo>
        <View style={styles.checkbox}>
          {item.done && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
    </View>
  )
  
  return (
    <SwipeListView
      data={initialTodos}
      renderItem={(data, rowMap) => (
        // <DraggableFlatList
        //   data={initialTodos}
        //   onDragEnd={() => {}}
        //   keyExtractor={(item) => item.id}
        //   renderItem={renderItem}
        // />
        <View style={styles.container}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: getPriorityColor(data.item.priority) },
            ]}
            // onLongPress={drag}
          >
            {data.item.done ? (
              <Typo
                style={styles.doneText}
                family={Fonts.Pretendard.medium}
                color={Colors.gray666}
                size={12}
              >
                {data.item.text}
              </Typo>
            ) : (
              <Typo
                family={Fonts.Pretendard.medium}
                color={Colors.gray666}
                size={12}
              >
                {data.item.text}
              </Typo>
            )}
            <View style={styles.checkbox}>
              {data.item.done && <Text style={styles.checkmark}>✓</Text>}
            </View>
          </TouchableOpacity>
        </View>
      )}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-53}
      disableRightSwipe
      keyExtractor={(item) => item.id}
    />
  );
}

export default TodoList

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  doneText: {
    textDecorationLine: 'line-through',
    color: Colors.gray999,
  },
  checkbox: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.grayD9,
    borderRadius: 4,
  },
  checkmark: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.green,
  },
  deleteButton: {
    backgroundColor: Colors.grayE9,
    width: 38,
    height: '100%',
    alignItems: 'center',
    paddingTop: 8.5,
    borderRadius: 4,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: 4,
    paddingTop: 12,
  },
})