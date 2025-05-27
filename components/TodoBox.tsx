import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import Typo from './Typo'

const TodoBox = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dateBox}>
          <Typo style={{paddingRight: 8}} family={Fonts.Jalnan.default} size={15}>오늘</Typo>
          <Typo family={Fonts.Jalnan.default} size={12} color={Colors.gray999}>2025.5.24(토)</Typo>
        </View>
        <Image source={require("../assets/images/pin.png")} />
      </View>
      <TodoList />
      <AddTodo />
    </View>
  )
}

export default TodoBox

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    borderRadius: 16
  },
  header: {
    flex: 1,
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
