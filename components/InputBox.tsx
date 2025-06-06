import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import Typo from './Typo'

interface InputBoxProps {
  value: string;
  onChangeText: (text: string) => void;
}

const InputBox = ({ value, onChangeText }: InputBoxProps) => {
  return (
    <View style={styles.container}>
      <Typo style={styles.title} family={Fonts.Jalnan.default} size={16}>할 일 작성</Typo>
      <TextInput
        style={styles.textInput}
        placeholder='할 일을 적어주세요.'
        placeholderTextColor={Colors.gray999}
        textAlignVertical='top'
        multiline
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}

export default InputBox

const styles = StyleSheet.create({
  container: {
    paddingTop: 44
  },
  title: {
    marginBottom: 20
  },
  textInput: {
    height: 160,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 20,
    fontSize: 14
  }
})