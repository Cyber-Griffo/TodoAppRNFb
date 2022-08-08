import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export type Props = {
  done: boolean
  title: string
  id: string
  toggleTodo: (id: string) => void
  removeTodo: (id: string) => void
}

export type TodoElementStyleContext = {
  done: boolean
}

export type TodoElementStyles = {
  container: StyleProp<ViewStyle>
  title: StyleProp<TextStyle>
  mark: StyleProp<ViewStyle>
  wrapper: StyleProp<ViewStyle>
}