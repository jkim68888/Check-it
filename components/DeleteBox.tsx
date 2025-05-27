import { Colors } from '@/constants/Colors'
import { Todo } from '@/types/Todo'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

const DeleteBox = (item: Todo) => {
  return (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {}}
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