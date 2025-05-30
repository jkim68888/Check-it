export type Todo = {
  id: string
  text: string
  priority: Priority
  done: boolean
}

export type Priority = 'low' | 'medium' | 'high';