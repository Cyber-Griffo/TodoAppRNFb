import { ColorValue, StyleProp, TextStyle, ViewStyle } from 'react-native'

export type Props = {
  text: string
  textColor?: ColorValue
  lineColor?: ColorValue
  textBackground?: ColorValue
}

export type SectionHeaderStylesContext = {
  textColor?: ColorValue
  lineColor?: ColorValue
  textBackground?: ColorValue
}

export type SectionHeaderStyles = {
  breaker: StyleProp<ViewStyle>
  textContainer: StyleProp<ViewStyle>
  text: StyleProp<TextStyle>
}
