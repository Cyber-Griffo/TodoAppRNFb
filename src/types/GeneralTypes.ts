import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export type Todo = {
  done: boolean
  title: string
  id: string
  timestamp: FirebaseFirestoreTypes.Timestamp
  categoryId: string
}

export type Category = {
  title: string
  id: string
}

export type CategoryCount = {
  categoryId: string
  count: number
}
