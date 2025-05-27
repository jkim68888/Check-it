import TodoBox from '@/components/TodoBox';
import { Colors } from '@/constants/Colors';
import { TodoContainer } from '@/types/TodoContainer';
import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const home = () => {
  const initialTodoBoxes: TodoContainer[] = [
    { id: '1', title: '오늘', subTitle: '2025.5.24(토)', imageSource: require('../../assets/images/pin.png') },
    { id: '2', title: '미래', subTitle: '', imageSource: require('../../assets/images/blank.png') },
  ]

  return (
    <GestureHandlerRootView>
      <View style={styles.container}> 
        <View style={styles.header}>
          <Image resizeMode='contain' source={require('../../assets/images/logo.png')} />
        </View>
        <FlatList 
          data={initialTodoBoxes} 
          keyExtractor={(item) => item.id}
          renderItem={(data) => (
            <TodoBox {...data.item} />
        )} />
      </View>
    </GestureHandlerRootView>
  )
}

export default home

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    padding: 20
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20
  }
})