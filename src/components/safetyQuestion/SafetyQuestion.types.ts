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
  touchableWrapper: StyleProp<ViewStyle>
  buttonText: StyleProp<TextStyle>
}
