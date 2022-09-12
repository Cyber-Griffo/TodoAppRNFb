import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { firestoreCategoryPath, firestoreTodoPath } from '../constants/Firebase'

const uid = auth().currentUser?.uid

export async function toggleTodo(id: string, newValue: boolean) {
  if (!uid) return

  await firestoreTodoPath
    .doc(id)
    .update({
      done: newValue,
    })
    .catch((err) => {
      console.error(err)
    })

  console.log('Updated Todo successfully')
}

export async function addTodo(title: string, category: string) {
  if (!uid) return

  await firestoreTodoPath
    .add({
      title,
      done: false,
      timestamp: firestore.FieldValue.serverTimestamp(),
      category,
    })
    .catch((err) => {
      console.error(err)
    })

  console.log('Added Todo successfully')
}

export async function removeTodo(id: string) {
  if (!uid) return

  await firestoreTodoPath
    .doc(id)
    .delete()
    .catch((err) => {
      console.error(err)
    })

  console.log('Removed Todo successfully')
}

export async function addCategory(category: string) {
  if (!uid) return

  await firestoreCategoryPath.add({
    category,
  })

  console.log('Added Category successfully')
}

/**
 * @param  {string} category
 * removes Category and all asigned Todos
 * So be sure you want to delete all before calling this funciton!
 */
export async function removeCategory(category: string) {
  if (!uid) return

  const categoryRef = await firestoreCategoryPath
    .where('category', '==', category)
    .get()

  const todoRef = await firestoreTodoPath
    .where('category', '==', category)
    .get()

  const batch = firestore().batch()

  categoryRef.forEach((doc) => {
    batch.delete(doc.ref)
  })

  todoRef.forEach((doc) => {
    batch.delete(doc.ref)
  })

  await batch.commit()

  console.log('Removed Category Successfully')
}
