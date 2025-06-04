import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import { useTodo } from '@/hooks/useTodo'
import { Todo } from '@/types/Todo'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import DeleteBox from './DeleteBox'
import Typo from './Typo'

interface TodoItemProps {
  todo: Todo;
  drag: () => void;
  isActive: boolean;
}

const TodoItem = ({ todo, drag, isActive }: TodoItemProps) => {
  const { toggleDone } = useTodo()

  const renderRightActions = () => (
    <DeleteBox {...todo} />
  )

  return (
    <TouchableOpacity 
      onLongPress={drag}
      delayLongPress={100}
      style={{ opacity: isActive ? 0.5 : 1 }}
    >
      <View style={styles.container}>
        <Swipeable
          childrenContainerStyle={[
            styles.button,
            {backgroundColor: todo.priority.color}
          ]}
          renderRightActions={renderRightActions}
          overshootRight={true}
        >
          
            {todo.done ? (
              <Typo
                style={styles.doneText}
                family={Fonts.Pretendard.medium}
                color={Colors.gray666}
                size={12}
              >
                {todo.text}
              </Typo>
            ) : (
              <Typo
                family={Fonts.Pretendard.medium}
                color={Colors.gray666}
                size={12}
              >
                {todo.text}
              </Typo>
            )}
            <TouchableOpacity style={styles.checkbox} onPress={() => toggleDone(todo)}>
              {todo.done && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
        </Swipeable>
      </View>
    </TouchableOpacity>
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
    color: Colors.gray999
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