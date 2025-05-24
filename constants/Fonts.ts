import { Platform } from "react-native";

// 폰트 패밀리 타입 정의
type FontFamily = 'Jalnan' | 'Pretendard'
type FontWeight = 'default' | 'regular' | 'medium' 

// 폰트 패밀리 매핑
export const Fonts: Record<FontFamily, Record<FontWeight, string>> = {
  Jalnan: {
    default: Platform.select({
      ios: 'JalnanOTF',
      android: 'JalnanOTF',
    }) || 'System',
    regular: 'System',
    medium: 'System'
  },
  Pretendard: {
    default: 'System',
    regular: Platform.select({
      ios: 'Pretendard-Regular',
      android: 'Pretendard-Regular',
    }) || 'System',
    medium: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }) || 'System'
  }
}

