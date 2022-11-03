import React from 'react'
import {
  ColorValue,
  GestureResponderEvent,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'
import { Theme } from '../../utils/ThemeContext'

export type Props = {
  children?: React.ReactNode
  value: string
  variant?: 'primary' | 'secondary' | 'error'
  rounded?: boolean
  iconButton?: boolean
  onPress?: ((event: GestureResponderEvent) => void) | undefined
  style?: {
    text?: StyleProp<TextStyle>
    container?: StyleProp<ViewStyle>
    wrapper?: StyleProp<ViewStyle>
  }
  pressableProps?: PressableProps
  borderRadius?: number
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  showIconLeft?: boolean
  showIconRight?: boolean
  pressEffectSize?: boolean
  pressEffectColor?: boolean
  inverted?: boolean
  pressEffectViewStyles?: StyleProp<ViewStyle>
  pressEffectTextStyles?: StyleProp<TextStyle>
}

export type ButtonStyleContext = {
  theme: Theme
  variant?: 'primary' | 'secondary' | 'error'
  rounded: boolean
  borderRadius: number
  iconButton: boolean
  backgroundColor: ColorValue
  textColor: ColorValue
}

export type ButtonStyles = {
  buttonContainer: StyleProp<ViewStyle>
  text: StyleProp<TextStyle>
  pressable: StyleProp<ViewStyle>
}
