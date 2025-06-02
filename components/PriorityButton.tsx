import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import { PrioritySelectProps } from '@/types/PrioritySelectProps'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import Typo from './Typo'

const PriorityButton = ({
  item,
  selectedItem,
  onPress
}: PrioritySelectProps) => {
  const isSelected = selectedItem === item

  return (
    <Pressable onPress={() => onPress(item)}>
      <View style={[styles.button, {backgroundColor: isSelected ? item.bg : 'transparent'}]}>
          <View style={[styles.circle, {backgroundColor: item.color}]} />
          <Typo 
            family={Fonts.Pretendard.medium} 
            size={16}
            color={isSelected ? Colors.white : Colors.black}
          >
            {item.text}
          </Typo>
        </View>
    </Pressable>
  )
}

export default PriorityButton

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 40,
    borderRadius: 20
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 16, 
    height: 16, 
    borderRadius: 8,
    marginRight: 8
  }
})