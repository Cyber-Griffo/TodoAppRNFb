import { StyleProp, ViewStyle } from 'react-native'
import { Todo } from '../../screens/todo/TodoScreen.types'

export type Props = {
  todos: Todo[]
  todoOnPress: (id: string, done: boolean) => void
  todoOnLongPress: (id: string) => void
  displayTodoCategory?: boolean
}

export type TodoListStyleContext = {}

export type TodoListStyles = {
  list: StyleProp<ViewStyle>
}
