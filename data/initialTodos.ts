import { priorities } from "./priorities";

export const initialTodos = [
  { id: '1', order: 0, text: '우측의 네모를 눌러 완료!', priority: priorities[0], done: true },
  { id: '2', order: 1, text: '길게 눌러 순서 변경!', priority: priorities[1], done: false },
  { id: '3', order: 2, text: '왼쪽으로 스와이프 하여 삭제!', priority: priorities[2], done: false },
]