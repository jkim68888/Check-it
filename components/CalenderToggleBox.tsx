import Typo from '@/components/Typo'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Calendar } from 'react-native-calendars'

interface CalendarToggleBoxProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const CalenderToggleBox = ({ 
  selectedDate, 
  onDateChange 
}: CalendarToggleBoxProps) => {

  dayjs.locale('ko')
  
  const today = dayjs().format('YYYY-MM-DD')
  const [isCalendarVisible, setCalendarVisible] = useState(false)

  const toggleCalendar = () => {
    setCalendarVisible(prev => !prev)
  }

  const handleDayPress = (day: { dateString: string }) => {
    onDateChange(day.dateString)
    setCalendarVisible(false)
  }

  const getTitleText = () => {
    return dayjs(selectedDate).isSame(today, 'day') ? "오늘" : "미래"
  }

  const getDateText = () => {
    return dayjs(selectedDate).format('YYYY.M.D(dd)')
  }

  return (
    <View>
      <TouchableOpacity onPress={toggleCalendar} style={styles.dateButton}>
        <Typo style={styles.todayText} family={Fonts.Jalnan.default} size={16}>
          {getTitleText()}
        </Typo>
        <Typo family={Fonts.Jalnan.default} size={14} color={Colors.gray999}>
          {getDateText()}
        </Typo>
        <Image
          source={require('../assets/images/toggle.png')}
          style={[
            styles.arrow,
            isCalendarVisible && { transform: [{ rotate: '180deg' }] }
          ]}
        />
      </TouchableOpacity>

      {/* 달력 */}
      {isCalendarVisible && (
        <Calendar
          onDayPress={handleDayPress}
          minDate={today}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: Colors.primary
            }
          }}
          theme={{
            selectedDayBackgroundColor: Colors.primary,
            todayTextColor: Colors.primary,
            arrowColor: Colors.primary,
            textDayFontFamily: Fonts.Pretendard.regular,
            textDayHeaderFontFamily: Fonts.Pretendard.regular,
            textMonthFontFamily: Fonts.Pretendard.medium
          }}
          style={styles.calendar}
        />
      )}
    </View>
  )
}

export default CalenderToggleBox

const styles = StyleSheet.create({
  dateButton: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 44
  },
  todayText: {
    marginRight: 8
  },
  arrow: {
    marginLeft: 4
  },
  calendar: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
    paddingBottom: 10
  }
})