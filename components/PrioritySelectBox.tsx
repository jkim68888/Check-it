
import { Fonts } from '@/constants/Fonts'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PriorityButton from './PriorityButton'
import Typo from './Typo'

const PrioritySelectBox = () => {
  return (
    <View style={styles.container}>
      <Typo style={styles.title} family={Fonts.Jalnan.default} size={16}>중요도 선택</Typo>
      <PriorityButton />
    </View>
  )
}

export default PrioritySelectBox

const styles = StyleSheet.create({
  container: {
    paddingTop: 44
  },
  title: {
    marginBottom: 20
  }
})