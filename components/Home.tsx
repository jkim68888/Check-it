import TodoBox from '@/components/TodoBox';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { useTodo } from '@/hooks/useTodo';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, Modal, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Typo from './Typo';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = () => {
  const { todoContainers, todos } = useTodo();
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}> 
        <View style={styles.header}>
          <Image 
            resizeMode='contain' 
            source={require('../assets/images/logo.png')} 
          />
          <TouchableOpacity onPress={() => setIsInfoVisible(true)}>
            <Image 
              resizeMode='contain' 
              source={require('../assets/images/info.png')} 
            />
          </TouchableOpacity>
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

        <Modal
          animationType="fade"
          transparent={true}
          visible={isInfoVisible}
          onRequestClose={() => setIsInfoVisible(false)}
          statusBarTranslucent={true}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1} 
            onPress={() => setIsInfoVisible(false)}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Typo family={Fonts.Jalnan.default} size={16}>주의</Typo>
                <TouchableOpacity onPress={() => setIsInfoVisible(false)}>
                  <Typo color={Colors.primary} family={Fonts.Jalnan.default} size={16}>X</Typo>
                </TouchableOpacity>
              </View>
              <Typo family={Fonts.Pretendard.regular} size={16}>
                과거의 할 일은 삭제되어 보여지지 않습니다.
              </Typo>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </GestureHandlerRootView>
  )
}

export default Home

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  modalContent: {
    ...Platform.select({
      ios: {
        width: '90%',
        maxWidth: 400,
      },
      android: {
        top: windowHeight / 2,
        left: windowWidth / 2,
        width: 300,
        height: 124,
        elevation: 5,
      },
    }),
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  }
})