import { Colors } from '@/constants/Colors';
import { useTodo } from '@/hooks/useTodo';
import { Todo } from '@/types/Todo';
import React from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const DeleteBox = (todo: Todo) => {
  const { deleteTodo } = useTodo();

  const handleDelete = () => {
    Alert.alert('삭제', '할 일을 삭제할까요?', [
      { text: '취소', style: 'cancel' },
      { text: '삭제', onPress: () => deleteTodo(todo) },
    ])
  }
  
  return (
    <View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
      >
        <Image source={require('../assets/images/delete.png')} />
      </TouchableOpacity>
    </View>
  )
}

export default DeleteBox

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: Colors.grayE9,
    width: 38,
    height: '100%',
    alignItems: 'center',
    paddingTop: 8.5,
    borderRadius: 4,
    marginLeft: 16
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: 4,
    paddingTop: 12,
  }
})