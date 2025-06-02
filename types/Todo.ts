import { Priority } from "./Priority"

export type Todo = {
  id: string
  order: number
  text: string
  priority: Priority
  done: boolean
}