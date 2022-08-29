import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

export type Props = {
  children: React.ReactNode
  onBackdropPress?: () => void
  containerStyles?: StyleProp<ViewStyle>
}

export type ModalStyleContext = {
  containerStyles?: StyleProp<ViewStyle>
}

export type ModalStyles = {
  wrapper: StyleProp<ViewStyle>
  container: StyleProp<ViewStyle>
}
