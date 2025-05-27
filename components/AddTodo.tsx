import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Typo from './Typo'

const AddTodo = () => {
  const handleAdd = () => {
    console.log('할 일 추가 화면으로 이동')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Typo family={Fonts.Pretendard.medium} color={Colors.gray666} size={12}>+ 할 일 추가 하기</Typo>
      </TouchableOpacity>
    </View>
  )
}

export default AddTodo

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.grayE9,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    width: '100%',
    alignItems: 'flex-start',
  }
})
