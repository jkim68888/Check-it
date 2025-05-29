import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import React, { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Typo from './Typo'

const PriorityButton = () => {
  const [selected, setSelected] = useState(false)

  const selectPriority = () => {
    setSelected(prev => !prev)
  }
  return (
    <Pressable onPress={selectPriority}>
        {({ pressed }) => (
          <View style={selected ? styles.selectedButton: styles.defaultButton}>
            <View style={styles.circle} />
            <Typo 
              style={selected ? styles.selectedText: styles.defaultText} 
              family={Fonts.Pretendard.medium} 
              size={16}>
                긴급
            </Typo>
          </View>
        )} 
    </Pressable>
  )
}

export default PriorityButton

const styles = StyleSheet.create({
  defaultButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 40,
    borderRadius: 20
  },
  selectedButton: {
    backgroundColor: Colors.highBg,
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
    backgroundColor: Colors.high, 
    borderRadius: 8,
    marginRight: 8
  },
  defaultText: {
    color: Colors.black
  },
  selectedText: {
    color: Colors.white
  }
})