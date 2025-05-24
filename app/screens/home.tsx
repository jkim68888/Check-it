import Typo from '@/components/Typo'
import { Fonts } from '@/constants/Fonts'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const home = () => {
  return (
    <View>
      <Typo size={30} family={Fonts.Jalnan.default}>체크잇체크잇체크잇</Typo>
      <Typo size={30}>체크잇체크잇체크잇</Typo>
    </View>
  )
}

export default home

const styles = StyleSheet.create({})