import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export type Todo = {
  done: boolean
  title: string
  id: string
  timestamp: FirebaseFirestoreTypes.Timestamp
  category: string
}

export type TodoScreenProps = {
  todos: Todo[]
}

export type TodoScreenStyleContext = {
  HEADER_HEIGHT: number
  FOOTER_HEIGHT: number
}

export type TodoScreenStyles = {
  wrapperContainer: StyleProp<ViewStyle>
  headerWrapper: StyleProp<ViewStyle>
  headerContainer: StyleProp<ViewStyle>
  headerText: StyleProp<TextStyle>
  footerButton: StyleProp<ViewStyle>
  footerText: StyleProp<TextStyle>
  loadingScreenContainer: StyleProp<ViewStyle>
  loadingScreenText: StyleProp<TextStyle>
}
