import { Fonts } from '@/constants/Fonts'
import { priorities } from '@/data/priorities'
import { Priority } from '@/types/Priority'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import PriorityButton from './PriorityButton'
import Typo from './Typo'

interface PrioritySelectBoxProps {
  selectedPriority: Priority | null;
  onPriorityChange: (priority: Priority) => void;
}

const PrioritySelectBox = ({ 
  selectedPriority, 
  onPriorityChange 
}: PrioritySelectBoxProps) => {
  
  return (
    <View style={styles.container}>
      <Typo style={styles.title} family={Fonts.Jalnan.default} size={16}>
        중요도 선택
      </Typo>
      <FlatList
        keyExtractor={(item) => item[0]}
        data={Object.entries(priorities)}
        renderItem={(data) => (
          <PriorityButton
            item={data.item[1]}
            selectedItem={selectedPriority}
            onPress={onPriorityChange}
          />
        )}
        extraData={selectedPriority}
        numColumns={3}
        columnWrapperStyle={styles.row}
      />
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
  },
  row: {
    justifyContent: 'space-around'
  }
})