export type Todo = {
  id: string
  order: number
  text: string
  priority: Priority
  done: boolean
}

export type Priority = 'low' | 'medium' | 'high';