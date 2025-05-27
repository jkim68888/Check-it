import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import { Todo } from '@/types/Todo'
import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Typo from './Typo'

const TodoItem = (item: Todo) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return Colors.high
      case 'medium': return Colors.middle
      case 'low': return Colors.low
      default: return Colors.low
    }
  }
  
  const handleOrder = () => {
    Alert.alert('순서 변경', '할 일 순서를 변경할까요?', [
      { text: '취소', style: 'cancel' },
      { text: '변경', onPress: () => {} },
    ])
  }

  const handleDelete = () => {
    Alert.alert('삭제', '할 일을 삭제할까요?', [
      { text: '취소', style: 'cancel' },
      { text: '삭제', onPress: () => {} },
    ])
  }
  
  return (
    <View style={styles.container}>
      <RectButton
        style={[
          styles.button,
          {backgroundColor: getPriorityColor(item.priority)}
        ]}
        onLongPress={handleOrder}
      >
        {item.done ? (
          <Typo
            style={styles.doneText}
            family={Fonts.Pretendard.medium}
            color={Colors.gray666}
            size={12}
          >
            {item.text}
          </Typo>
        ) : (
          <Typo
            family={Fonts.Pretendard.medium}
            color={Colors.gray666}
            size={12}
          >
            {item.text}
          </Typo>
        )}
        <View style={styles.checkbox}>
          {item.done && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </RectButton>
    </View>
  )
}

export default TodoItem

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    alignItems: 'center'
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
  }
})