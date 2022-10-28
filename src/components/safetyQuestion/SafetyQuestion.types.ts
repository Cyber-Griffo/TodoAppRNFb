import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { TodoLocal } from '../../types/GeneralTypes'
import { Theme } from '../../utils/ThemeContext'

export type Props = {
  todo?: TodoLocal
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
