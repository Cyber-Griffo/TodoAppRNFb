import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export type Props = {
  createFunction: (title: string) => void
  cancelFunction: () => void
}

export type RefFunctions = {
  isInputEmpty: () => boolean
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
