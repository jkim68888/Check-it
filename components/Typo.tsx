import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import React from 'react';
import { Text, TextStyle } from 'react-native';

interface TypoProps {
  children: any | null
  family?: string
  size?: number
  color?: string
  align?: any
  style?: TextStyle
  numberOfLines?: number
}

const Typo = ({
  children,
  family = Fonts.Pretendard.regular,
  size = 15,
  color = Colors.black,
  align = 'left',
  style,
  numberOfLines = 0,
}: TypoProps) => {

  const textStyle: TextStyle = {
    fontSize: size,
    fontFamily: family,
    color,
    textAlign: align
  };
  
  return (
    <Text
      style={[textStyle, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  )
}

export default Typo