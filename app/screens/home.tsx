import TodoBox from '@/components/TodoBox'
import { Colors } from '@/constants/Colors'
import React from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'

const home = () => {
  return (
    <View style={styles.container}> 
      <View style={styles.header}>
        <Image resizeMode='contain' source={require('../../assets/images/logo.png')} />
      </View>
      <ScrollView>
        {/* <Typo size={30} family={Fonts.Jalnan.default}>체크잇체크잇체크잇</Typo>
        <Typo size={30}>체크잇체크잇체크잇</Typo> */}
        <TodoBox />
      </ScrollView>
    </View>
  )
}

export default home

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    padding: 20
  },
  header: {
    paddingTop: 40,
    paddingBottom: 28
  }
})