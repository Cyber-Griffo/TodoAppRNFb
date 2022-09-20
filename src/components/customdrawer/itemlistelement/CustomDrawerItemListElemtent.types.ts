import { StyleProp, TextStyle, ViewStyle } from 'react-native'

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
  activeTintColor?: string
  inactiveTintColor?: string
  activeBackgroundColor?: string
  inactiveBackgroundColor?: string
  allowFontScaling?: boolean
  focused?: boolean
}

export type CustomDrawerItemListElemtentStyles = {}
