import * as Font from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const index = () => {
  const router = useRouter()

  const loadFonts = async () => {
    await Font.loadAsync({
      'JalnanOTF': require('../assets/fonts/JalnanOTF.otf'),
      'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
      'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf')
    })
  }

  useEffect(() => {
    loadFonts()
    
    setTimeout(() => {
      router.push("/screens/home")
    }, 2000)
  }, [])

  return (
    <View style={styles.container}>
      <Image resizeMode='contain' source={require("../assets/images/splashImage.png")} />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})