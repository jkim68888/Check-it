import { Priority } from "./Priority"

export type Todo = {
  id: string
  order: number
  date: Date
  text: string
  priority: Priority
  done: boolean
}