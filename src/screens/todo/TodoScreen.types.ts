import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Category, TodoLocal } from '../../types/GeneralTypes'
import { Theme } from '../../utils/ThemeContext'

export type TodoScreenProps = {
  todos: TodoLocal[]
  activeCategory?: Category
  categories: Category[]
  todoFunctions: {
    handleTodoAddedChange: (newTodo: TodoLocal, databaseTodo?: boolean) => void
    handleTodoModifiedChange: (
      modifiedTodo: TodoLocal,
      databaseTodo?: boolean
    ) => void
    handleTodoRemovedChange: (deletedTodo: TodoLocal) => void
  }
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
