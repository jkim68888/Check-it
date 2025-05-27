import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import { TodoContainer } from '@/types/TodoContainer'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import Typo from './Typo'

const TodoBox = (item: TodoContainer) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dateBox}>
          <Typo style={{paddingRight: 8}} family={Fonts.Jalnan.default} size={15}>{item.title}</Typo>
          <Typo family={Fonts.Jalnan.default} size={12} color={Colors.gray999}>{item.subTitle}</Typo>
        </View>
        <Image source={item.imageSource} />
      </View>
      { item.title != '미래' && <TodoList /> }
      <AddTodo />
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
