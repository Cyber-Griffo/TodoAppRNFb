import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { TodoLocal } from '../../types/GeneralTypes'
import { Theme } from '../../utils/ThemeContext'

export type Props = {
  todo: TodoLocal
  onPress?: (...args: any) => any
  onLongPress?: (...args: any) => any
  showCategory?: boolean
  style?: {
    wrapper?: StyleProp<ViewStyle>
  }
  pressable?: boolean
  pressEffectScale?: number
}

export type TodoElementStyleContext = {
  theme: Theme
  todo: TodoLocal
}

export type TodoElementStyles = {
  container: StyleProp<ViewStyle>
  titleWrapper: StyleProp<ViewStyle>
  title: StyleProp<TextStyle>
  titlePressed: StyleProp<TextStyle>
  categoryTitle: StyleProp<TextStyle>
  categoryTitlePressed: StyleProp<TextStyle>
  mark: StyleProp<ViewStyle>
  markPressed: StyleProp<ViewStyle>
  markFiller: StyleProp<ViewStyle>
  markFillerPressed: StyleProp<ViewStyle>
  wrapper: StyleProp<ViewStyle>
}
