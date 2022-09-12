import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

export const firestoreCategoryPath = firestore()
  .collection('users')
  .doc(auth().currentUser?.uid)
  .collection('categories')

export const firestoreTodoPath = firestore()
  .collection('users')
  .doc(auth().currentUser?.uid)
  .collection('todos')
