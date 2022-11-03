import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Theme } from '../../../utils/ThemeContext'

export type Props = {
  label:
    | string
    | ((props: { color: string; focused: boolean }) => React.ReactNode)
  icon?: (props: {
    focused: boolean
    size: number
    color: string
  }) => React.ReactNode

  focused?: boolean
  activeTintColor?: string
  inactiveTintColor?: string
  activeBackgroundColor?: string
  inactiveBackgroundColor?: string
  allowFontScaling?: boolean
  labelStyle?: StyleProp<TextStyle>
  style?: StyleProp<ViewStyle>
  onPress: () => void
  index: number
  categoryCount: number
}

export type CustomDrawerItemListElemtentStyleContext = {
  theme: Theme
}

export type CustomDrawerItemListElemtentStyles = {
  wrapper: StyleProp<ViewStyle>
  pressable: StyleProp<ViewStyle>
  containerWrapper: StyleProp<ViewStyle>
  containerWrapperPressed: StyleProp<ViewStyle>
  container: StyleProp<ViewStyle>
  containerFocused: StyleProp<ViewStyle>
  textFocused: StyleProp<TextStyle>
  categoryCountText: StyleProp<TextStyle>
  categoryCountTextFocused: StyleProp<TextStyle>
  focusedMarker: StyleProp<ViewStyle>
}
