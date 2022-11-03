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
}

export type TodoElementStyleContext = {
  theme: Theme
  todo: TodoLocal
}

export type TodoElementStyles = {
  container: StyleProp<ViewStyle>
  titleWrapper: StyleProp<ViewStyle>
  title: StyleProp<TextStyle>
  category: StyleProp<TextStyle>
  mark: StyleProp<ViewStyle>
  wrapper: StyleProp<ViewStyle>
}
