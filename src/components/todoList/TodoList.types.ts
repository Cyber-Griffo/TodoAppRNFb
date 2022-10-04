import { StyleProp, ViewStyle } from 'react-native'
import { TodoLocal } from '../../types/GeneralTypes'

export type Props = {
  todos: TodoLocal[]
  todoOnPress: (id: string) => void
  todoOnLongPress: (id: string) => void
  displayTodoCategory?: boolean
}

export type TodoListStyleContext = {}

export type TodoListStyles = {
  list: StyleProp<ViewStyle>
}
