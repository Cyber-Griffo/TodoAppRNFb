import React from 'react'
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  TouchableHighlightProps,
  ViewStyle,
} from 'react-native'

export type Props = {
  children?: React.ReactNode
  value: string
  variant?: 'primary' | 'secondary'
  rounded?: boolean
  iconButton?: boolean
  onPress?: ((event: GestureResponderEvent) => void) | undefined
  style?: {
    text?: StyleProp<TextStyle>
    container?: StyleProp<ViewStyle>
    wrapper?: StyleProp<ViewStyle>
  }
  touchableProps?: TouchableHighlightProps
  borderRadius?: number
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  showIconLeft?: boolean
  showIconRight?: boolean
}

export type ButtonStyleContext = {
  variant: 'primary' | 'secondary'
  rounded: boolean
  borderRadius: number
  iconButton: boolean
}

export type ButtonStyles = {
  buttonTouchable: StyleProp<ViewStyle>
  buttonView: StyleProp<ViewStyle>
  text: StyleProp<TextStyle>
}
