import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Theme } from '../../utils/ThemeContext'

export type Props = {
  createFunction: (title: string, categoryTitle: string) => void
  cancelFunction: () => void
  category: string
}

export type RefFunctions = {
  isInputEmpty: () => boolean
}

export type TodoInputStylesContext = {
  theme: Theme
}

export type TodoInputStyles = {
  container: StyleProp<ViewStyle>
  title: StyleProp<TextStyle>
  textInput: StyleProp<TextStyle>
  buttonWrapper: StyleProp<ViewStyle>
  touchableWrapper: StyleProp<ViewStyle>
  buttonText: StyleProp<TextStyle>
  errorText: StyleProp<TextStyle>
}
