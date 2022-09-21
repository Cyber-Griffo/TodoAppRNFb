import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Category, Todo } from '../../types/GeneralTypes'
import { Theme } from '../../utils/ThemeContext'

export type Props = {
  todo: Todo
  onPress: (id: string) => void
  onLongPress: (id: string) => void
  category?: Category
}

export type TodoElementStyleContext = {
  theme: Theme
  todo: Todo
}

export type TodoElementStyles = {
  container: StyleProp<ViewStyle>
  titleWrapper: StyleProp<ViewStyle>
  title: StyleProp<TextStyle>
  category: StyleProp<TextStyle>
  mark: StyleProp<ViewStyle>
  wrapper: StyleProp<ViewStyle>
}
