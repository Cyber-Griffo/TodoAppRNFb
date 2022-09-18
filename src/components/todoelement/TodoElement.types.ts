import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Todo } from '../../screens/todo/TodoScreen.types'
import { Theme } from '../../utils/ThemeContext'

export type Props = {
  todo: Todo
  onPress: (id: string) => void
  onLongPress: (id: string) => void
  displayCategoryTitle?: boolean
}

export type TodoElementStyleContext = {
  theme: Theme
  done: boolean
}

export type TodoElementStyles = {
  container: StyleProp<ViewStyle>
  titleWrapper: StyleProp<ViewStyle>
  title: StyleProp<TextStyle>
  titlePrefix: StyleProp<TextStyle>
  mark: StyleProp<ViewStyle>
  wrapper: StyleProp<ViewStyle>
}
