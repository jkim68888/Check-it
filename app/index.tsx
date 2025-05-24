import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'


const index = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push("/scene/home")
    }, 2000)
  }, [])

  return (
    <View style={styles.container}>
      <Image resizeMode='contain' source={require("../assets/images/splashImage.png")} />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})