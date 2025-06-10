import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import { useTodo } from '@/hooks/useTodo'
import { TodoContainer } from '@/types/TodoContainer'
import dayjs from 'dayjs'
import React from 'react'
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import Typo from './Typo'

const TodoBox = ({ 
  id,
  title,
  subTitle,
  imageSource,
  date
}: TodoContainer) => {
  const { todos, deleteAllTodosByDate } = useTodo()
  const today = dayjs().startOf('day')
  const isFutureDate = dayjs(date).startOf('day').isAfter(today)

  const handleDeleteAll = () => {
    if (isFutureDate) {
      Alert.alert('삭제', '할 일을 삭제할까요?', [
        { text: '취소', style: 'cancel' },
        { text: '삭제', onPress: () => date && deleteAllTodosByDate(date) },
      ])
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dateBox}>
          <Typo style={{paddingRight: 8}} family={Fonts.Jalnan.default} size={15}>{title}</Typo>
          <Typo family={Fonts.Jalnan.default} size={12} color={Colors.gray999}>{subTitle}</Typo>
        </View>
        <TouchableOpacity onPress={handleDeleteAll}>
          <Image source={imageSource} />
        </TouchableOpacity>
      </View>
      {date && <TodoList date={date} />}
      <AddTodo date={date} />
    </View>
  )
}

export default TodoBox

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 28,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    borderRadius: 16
  },
  header: {
    height: 39,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dateBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline'
  }
})
