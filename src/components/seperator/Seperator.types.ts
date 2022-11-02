import { StyleProp, ViewStyle } from 'react-native'
import { Theme } from '../../utils/ThemeContext'

export type Props = {
  styles?: StyleProp<ViewStyle>
}

export type SeperatorStyleContext = {
  theme: Theme
}

export type SeperatorStyles = {
  line: StyleProp<ViewStyle>
}
