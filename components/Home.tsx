import TodoBox from '@/components/TodoBox';
import { Colors } from '@/constants/Colors';
import { useTodo } from '@/hooks/useTodo';
import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Home = () => {
  const { todoContainers, todos } = useTodo();

  return (
    <GestureHandlerRootView>
      <View style={styles.container}> 
        <View style={styles.header}>
          <Image resizeMode='contain' source={require('../assets/images/logo.png')} />
        </View>
        <FlatList 
          data={todoContainers}
          extraData={todos}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={(data) => (
            <TodoBox {...data.item} />
          )}
        />
      </View>
    </GestureHandlerRootView>
  )
}

export default Home

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