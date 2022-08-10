import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export type Props = {
  createFunction: (title: string) => void
  cancelFunction: () => void
}

export type TodoInputStyles = {
  container: StyleProp<ViewStyle>
  title: StyleProp<TextStyle>
  textInput: StyleProp<TextStyle>
  buttonWrapper: StyleProp<ViewStyle>
  buttonContainer: StyleProp<ViewStyle>
  buttonText: StyleProp<TextStyle>
}