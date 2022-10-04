import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export type TodoFirebase = {
  done: boolean
  title: string
  id: string
  categoryId: string
  timestamp: FirebaseFirestoreTypes.Timestamp
  lastChange: FirebaseFirestoreTypes.Timestamp
}

export type TodoLocal = {
  done: boolean
  title: string
  id: string
  categoryId: string
  timestamp: Date
  lastChange: Date
}

export type CategoryLocal = {
  title: string
  id: string
  lastChange: Date
}

export type CategoryFirebase = {
  title: string
  id: string
  lastChange: FirebaseFirestoreTypes.Timestamp
}

export type CategoryCount = {
  categoryId: string
  count: number
}
