import { ColorValue, StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Theme } from '../../../utils/ThemeContext'

export type Props = {
  text: string
  textColor?: ColorValue
  lineColor?: ColorValue
  textBackground?: ColorValue
}

export type SectionHeaderStylesContext = {
  theme: Theme
  textColor?: ColorValue
  lineColor?: ColorValue
  textBackground?: ColorValue
}

export type SectionHeaderStyles = {
  breaker: StyleProp<ViewStyle>
  textContainer: StyleProp<ViewStyle>
  text: StyleProp<TextStyle>
}
