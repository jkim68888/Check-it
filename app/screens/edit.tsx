import CalenderToggleBox from '@/components/CalenderToggleBox'
import InputBox from '@/components/InputBox'
import PrioritySelectBox from '@/components/PrioritySelectBox'
import Typo from '@/components/Typo'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import { useTodo } from '@/hooks/useTodo'
import { Priority } from '@/types/Priority'
import dayjs from 'dayjs'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function EditScreen() {
  const router = useRouter()
  const { date } = useLocalSearchParams<{ date: string }>()
  const today = dayjs().format('YYYY-MM-DD')
  const [todoText, setTodoText] = useState('')
  const [selectedDate, setSelectedDate] = useState(date || today)
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(null)
  const { addTodo } = useTodo();

  const goBack = () => {
    router.back()
  }

  // 유효성 검사 함수
  const isFormValid = () => {
    return (
      todoText.trim().length > 0 &&
      selectedPriority !== null &&
      selectedDate !== null
    )
  }

  // 할 일 추가
  const handleAdd = () => {
    if (isFormValid()) {
      // selectedPriority가 이미 Priority 타입이거나 null이므로 null이 아닐 때만 실행
      if (selectedPriority) {
        const date = dayjs(selectedDate).toDate()  // string을 Date로 변환
        addTodo(todoText, selectedPriority, date)
        goBack()
      }
    }
  }

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack}>
          <Image source={require("../../assets/images/back.png")} />
        </TouchableOpacity>
        <CalenderToggleBox 
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        <InputBox 
          value={todoText}
          onChangeText={setTodoText}
        />
        <PrioritySelectBox 
          selectedPriority={selectedPriority}
          onPriorityChange={setSelectedPriority}
        />
        <TouchableOpacity
          style={[
            styles.button,
            isFormValid() ? styles.enabledButton : styles.disabledButton,
          ]}
          onPress={handleAdd}
          disabled={!isFormValid()}
        >
          <Typo
            style={isFormValid() ? styles.enabledButtonText : styles.disabledButtonText}
            family={Fonts.Pretendard.medium}
            size={16}
          >
            추가 하기
          </Typo>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 60,
    paddingHorizontal: 20
  },
  button: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  enabledButton: {
    backgroundColor: Colors.primary
  },
  disabledButton: {
    backgroundColor: Colors.grayD9
  },
  enabledButtonText: {
    color: Colors.white,
    textAlign: 'center',
  },
  disabledButtonText: {
    color: Colors.gray666,
    textAlign: 'center',
  }
})