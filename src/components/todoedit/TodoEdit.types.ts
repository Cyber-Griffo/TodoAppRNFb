import { StyleProp, ViewStyle } from 'react-native'
import { TodoLocal } from '../../types/GeneralTypes'
import { Theme } from '../../utils/ThemeContext'

export type Props = {
  todo?: TodoLocal
  handleEdit: (title: string) => void
  handleDelete: (id: string) => void
}

export type TodoEditStylesContext = {
  theme: Theme
}

export type TodoEditStyles = {
  container: StyleProp<ViewStyle>
}
