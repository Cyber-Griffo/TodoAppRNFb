import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Theme } from '../../utils/ThemeContext'

export type Todo = {
  done: boolean
  title: string
  id: string
  timestamp: FirebaseFirestoreTypes.Timestamp
  category: string
}

export type TodoScreenProps = {
  todos: Todo[]
  category?: 'all' | string
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
