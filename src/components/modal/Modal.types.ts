import { StyleProp, ViewStyle } from 'react-native'

export type Props = {
  children: React.ReactNode
  onBackdropPress?: () => void
  wrapperStyles?: StyleProp<ViewStyle>
  containerStyles?: StyleProp<ViewStyle>
}

export type ModalStyles = {
  wrapper: StyleProp<ViewStyle>
  container: StyleProp<ViewStyle>
}
