import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Theme } from '../../utils/ThemeContext'

export type Props = {
  title: string
  acceptFunction: () => void
  cancelFunction: () => void
}

export type SafetyQuestionStylesContext = {
  theme: Theme
}

export type SafetyQuestionStyles = {
  container: StyleProp<ViewStyle>
  title: StyleProp<TextStyle>
  buttonWrapper: StyleProp<ViewStyle>
  touchableWrapper: StyleProp<ViewStyle>
  buttonText: StyleProp<TextStyle>
}
