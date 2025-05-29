import * as Font from 'expo-font';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';

const index = () => {
  const router = useRouter()

  // 폰트 로딩
  const loadFonts = async () => {
    await Font.loadAsync({
      'JalnanOTF': require('../assets/fonts/JalnanOTF.otf'),
      'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
      'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf')
    })
  }

  // 캘린더 locale 설정
  LocaleConfig.locales['ko'] = {
    monthNames: [
      '1월', '2월', '3월', '4월', '5월', '6월',
      '7월', '8월', '9월', '10월', '11월', '12월'
    ],
    monthNamesShort: [
      '1월', '2월', '3월', '4월', '5월', '6월',
      '7월', '8월', '9월', '10월', '11월', '12월'
    ],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: '오늘'
  }

  LocaleConfig.defaultLocale = 'ko'

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