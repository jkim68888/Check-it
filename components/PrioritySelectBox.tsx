
import { Fonts } from '@/constants/Fonts'
import { priorities } from '@/data/priorities'
import { Priority } from '@/types/Priority'
import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import PriorityButton from './PriorityButton'
import Typo from './Typo'

const PrioritySelectBox = () => {
  const [selectedItem, setSelectedItem] = useState<Priority | null>(null)

  const handleItemPress = (item: Priority) => {
    setSelectedItem(item)
  }
  
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
            selectedItem={selectedItem}
            onPress={handleItemPress}
          />
        )}
        extraData={selectedItem}
        numColumns={3}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
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