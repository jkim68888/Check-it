import Home from '@/components/Home';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';

// 스플래시 화면이 즉시 사라지는 것을 방지
SplashScreen.preventAutoHideAsync().catch(() => {
  /* 에러 무시 */
});

const index = () => {
  const router = useRouter()
  const [appIsReady, setAppIsReady] = useState(false);

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
    async function prepare() {
      try {
        // 폰트 로딩, API 호출, 데이터 로딩 등 초기화 작업
        loadFonts()
        // 인위적으로 최소 2초 대기
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // 준비 완료
        setAppIsReady(true);
      }
    }

    prepare();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // 스플래시 화면 숨기기
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // 스플래시 화면 유지
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Home />
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