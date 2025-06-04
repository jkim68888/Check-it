import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import dayjs from 'dayjs'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Typo from './Typo'

interface AddTodoProps {
  date: Date;
}

const AddTodo = ({ date }: AddTodoProps) => {
  const router = useRouter()

  const handleAdd = () => {
    router.push({
      pathname: '/screens/edit',
      params: { date: dayjs(date).format('YYYY-MM-DD') }
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Typo family={Fonts.Pretendard.medium} color={Colors.gray666} size={12}>+ 할 일 추가하기</Typo>
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
