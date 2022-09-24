import { StyleProp, ViewStyle } from 'react-native'
import { Category, TodoFirebase } from '../../types/GeneralTypes'

export type Props = {
  todos: TodoFirebase[]
  categories: Category[]
  todoOnPress: (id: string, done: boolean) => void
  todoOnLongPress: (id: string) => void
  displayTodoCategory?: boolean
}

export type TodoListStyleContext = {}

export type TodoListStyles = {
  list: StyleProp<ViewStyle>
}
