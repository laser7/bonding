import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { TodoAttributes } from '../interfaces/todoAttributes'
import { todoList } from '../constant/todoList'

const { persistAtom } = recoilPersist()
const initialTodoState = todoList
export const todoState = atom<TodoAttributes[]>({
  key: 'todo',
  default: initialTodoState,
  effects_UNSTABLE: [persistAtom],
})
