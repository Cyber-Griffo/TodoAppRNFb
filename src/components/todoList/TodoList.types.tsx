import { StyleProp, ViewStyle } from 'react-native'
import { Todo } from '../../screens/todo/TodoScreen.types'

export type Props = {
  todos: Todo[]
  todoOnPress: (param: any) => void
  todoOnLongPress: (param: any) => void
}

export type TodoListStyleContext = {}

export type TodoListStyles = {
  list: StyleProp<ViewStyle>
}
