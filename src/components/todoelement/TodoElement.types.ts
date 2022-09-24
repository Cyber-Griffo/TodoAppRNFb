import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Category, TodoFirebase } from '../../types/GeneralTypes'
import { Theme } from '../../utils/ThemeContext'

export type Props = {
  todo: TodoFirebase
  onPress: (id: string) => void
  onLongPress: (id: string) => void
  category?: Category
}

export type TodoElementStyleContext = {
  theme: Theme
  todo: TodoFirebase
}

export type TodoElementStyles = {
  container: StyleProp<ViewStyle>
  titleWrapper: StyleProp<ViewStyle>
  title: StyleProp<TextStyle>
  category: StyleProp<TextStyle>
  mark: StyleProp<ViewStyle>
  wrapper: StyleProp<ViewStyle>
}
