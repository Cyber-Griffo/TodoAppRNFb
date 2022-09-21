import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Category, Todo } from '../../types/GeneralTypes'
import { Theme } from '../../utils/ThemeContext'

export type TodoScreenProps = {
  todos: Todo[]
  activeCategory?: Category
  categories: Category[]
}

export type TodoScreenStyleContext = {
  theme: Theme
}

export type TodoScreenStyles = {
  wrapperContainer: StyleProp<ViewStyle>
  headerWrapper: StyleProp<ViewStyle>
  headerContainer: StyleProp<ViewStyle>
  headerText: StyleProp<TextStyle>
  menuIcon: StyleProp<TextStyle>
  footerButton: StyleProp<ViewStyle>
  footerText: StyleProp<TextStyle>
  loadingScreenContainer: StyleProp<ViewStyle>
  loadingScreenText: StyleProp<TextStyle>
}
