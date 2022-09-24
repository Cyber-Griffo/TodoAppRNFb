import { StyleProp, ViewStyle } from 'react-native'
import { Category, TodoLocal } from '../../types/GeneralTypes'

export type Props = {
  todos: TodoLocal[]
  categories: Category[]
  todoOnPress: (id: string) => void
  todoOnLongPress: (id: string) => void
  displayTodoCategory?: boolean
}

export type TodoListStyleContext = {}

export type TodoListStyles = {
  list: StyleProp<ViewStyle>
}
