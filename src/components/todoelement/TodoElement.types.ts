import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export type Props = {
  done: boolean
  title: string
  id: string
  onPress: (id: string) => void
  onLongPress: (id: string) => void
}

export type TodoElementStyleContext = {
  done: boolean
}

export type TodoElementStyles = {
  container: StyleProp<ViewStyle>
  titleWrapper: StyleProp<ViewStyle>
  title: StyleProp<TextStyle>
  mark: StyleProp<ViewStyle>
  wrapper: StyleProp<ViewStyle>
}
