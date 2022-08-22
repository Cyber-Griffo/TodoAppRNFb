import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export type Props = {
  title: string
  acceptFunction: () => void
  cancelFunction: () => void
}

export type SafetyQuestionStyles = {
  container: StyleProp<ViewStyle>
  title: StyleProp<TextStyle>
  buttonWrapper: StyleProp<ViewStyle>
  buttonContainer: StyleProp<ViewStyle>
  buttonAccept: StyleProp<ViewStyle>
  buttonCancel: StyleProp<ViewStyle>
  buttonText: StyleProp<TextStyle>
  buttonTextCancel: StyleProp<TextStyle>
}