export type Todo = {
  id: string
  text: string
  priority: 'high' | 'medium' | 'low'
  done: boolean
}