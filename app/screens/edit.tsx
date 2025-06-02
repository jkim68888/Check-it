
import CalenderToggleBox from '@/components/CalenderToggleBox'
import InputBox from '@/components/InputBox'
import PrioritySelectBox from '@/components/PrioritySelectBox'
import Typo from '@/components/Typo'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const edit = () => {
  const router = useRouter()
  const [enable, setEnable] = useState(false)

  const goBack = () => {
    router.back()
  }

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack}>
          <Image source={require('../../assets/images/back.png')} />
        </TouchableOpacity>
        <CalenderToggleBox />
        <InputBox />
        <PrioritySelectBox />
        <TouchableOpacity style={styles.button}>
          <Typo style={styles.buttonText} family={Fonts.Pretendard.medium} size={16}>추가 하기</Typo>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  )
}

export default edit

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 60,
    paddingHorizontal: 20
  },
  button: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grayD9,
    borderRadius: 8
  },
  buttonText: {
    color: Colors.gray666,
    textAlign: 'center',
  }
})