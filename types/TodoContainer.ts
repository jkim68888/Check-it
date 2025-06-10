import { ImageSourcePropType } from "react-native"

export type TodoContainer = {
  id: string
  title: string
  subTitle: string,
  imageSource: ImageSourcePropType | undefined
  date: Date | null
}