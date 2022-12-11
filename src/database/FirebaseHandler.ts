import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { firestoreCategoryPath, firestoreTodoPath } from '../constants/Firebase'
import { faker } from '@faker-js/faker'
import { v4 } from 'uuid'
import { TodoLocal } from '../types/GeneralTypes'

const uid = auth().currentUser?.uid

export async function modifyTodoFirebase(todo: TodoLocal): Promise<void> {
  if (!uid) return

  await firestoreTodoPath
    .doc(todo.id)
    .update({
      ...todo,
    })
    .catch((err) => {
      console.error(err)
    })

  console.log('Updated Todo successfully')
}

export async function addTodoFirebase(todo: TodoLocal): Promise<void> {
  if (!uid) return

  await firestoreTodoPath
    .doc(todo.id)
    .set({
      ...todo,
      timestamp: firestore.FieldValue.serverTimestamp(),
      lastChange: firestore.FieldValue.serverTimestamp(),
    })
    .catch((err) => {
      console.error(err)
    })

  console.log('Added Todo successfully')
}

export async function removeTodoFirebase(todo: TodoLocal): Promise<void> {
  if (!uid) return

  await firestoreTodoPath
    .doc(todo.id)
    .delete()
    .catch((err) => {
      console.error(err)
    })

  console.log('Removed Todo successfully')
}

export async function addCategoryFirebase(title: string) {
  if (!uid) return

  const id = v4()

  await firestoreCategoryPath.doc(id).set({
    id,
    title,
    lastChange: firestore.FieldValue.serverTimestamp(),
  })

  console.log('Added Category successfully')
}

export async function removeCategoryFirebase(category: string) {
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

//#region TESTING PURPOSES ONLY
export async function TESTING_ONLY_ADD_MANY_TODOS(count: number) {
  //
  const categories: string[] = []
  const a = await firestoreCategoryPath.get()
  a.forEach((x) => categories.push(x.id as string))

  for (let index = 0; index < count; index++) {
    TESTING_ONLY_ADD_MANY_TODOS_TO_CATEGORY(
      1,
      categories[Math.floor(Math.random() * categories.length)]
    )
  }
}

export async function TESTING_ONLY_ADD_MANY_TODOS_TO_CATEGORY(
  count: number,
  categoryId: string
) {
  let todos = []
  let id = v4()
  for (let index = 0; index < count; index++) {
    todos.push({
      title: faker.lorem.sentence(Math.floor(Math.random() * 10) + 1),
      done: faker.datatype.boolean(),
      categoryId,
      timestamp: firestore.FieldValue.serverTimestamp(),
      lastChange: firestore.FieldValue.serverTimestamp(),
      id,
    })
  }

  todos.forEach((todo) => {
    firestoreTodoPath.doc(id).set(todo)
  })
}

export async function TESTING_ONLY_REMOVE_ALL_TODOS_FROM_CATEGORY(
  categoryId: string
) {
  const todos = await firestoreTodoPath
    .where('categoryId', '==', categoryId)
    .get()

  todos.forEach((todo) => {
    firestoreTodoPath.doc(todo.id).delete()
  })
}

export async function TESTING_ONLY_REMOVE_ALL_TODOS() {
  const todos = await firestoreTodoPath.get()

  todos.forEach((todo) => {
    firestoreTodoPath.doc(todo.id).delete()
  })
}

export async function TESTING_ONLY_REMOVE_ALL_CATEGORIES() {
  const categories = await firestoreCategoryPath.get()

  categories.forEach((category) => {
    firestoreCategoryPath.doc(category.id).delete()
  })
}

export async function TESTING_ONLY_ADD_MANY_CATEGORIES(count: number) {
  // Create random names for new Categories
  let categories = []
  for (let index = 0; index < count; index++) {
    categories.push({ title: faker.random.word() })
  }

  // For each category Name create the corresponding Firebase-Doc
  categories.forEach((category) => {
    firestoreCategoryPath.add(category)
  })
}

export async function TESTING_ONLY_REMOVE_ALL_CATEGORIES_WITH_NO_TODOS() {
  //Get all Categories
  const categories = await firestoreCategoryPath.get()

  categories.forEach(async (v) => {
    // Get all Todos for each Category
    const todos = await firestoreTodoPath.where('categoryId', '==', v.id).get()
    // IF there are none -> delete Category
    if (todos.empty) firestoreCategoryPath.doc(v.id).delete()
  })
}

export async function TESTING_ONLY_ADD_LASTCHANGE_TO_ALL_TODOS() {
  const todos = await firestoreTodoPath.get()

  todos.forEach((todo) => {
    firestoreTodoPath.doc(todo.id).update({
      ...todo.data(),
      lastChange: firestore.FieldValue.serverTimestamp(),
    })
  })
}

export async function TESTING_ONLY_CONVERT_TODOS() {
  const todos = await firestoreTodoPath.get()

  todos.forEach((todo) => {
    const id = v4()
    firestoreTodoPath.doc(id).set({ ...todo.data(), id })
    firestoreTodoPath.doc(todo.id).delete()
  })
}

export async function TESTING_ONLY_ADDING_CUSTOM_DOC_ID() {
  firestore().collection('test').doc('123').set({ title: 'baum' })
}

export async function TESTING_ONLY_ADDING_EMPTY_DESCRIPTION_TO_ALL_TODOS() {
  const todos = await firestoreTodoPath.get()

  todos.forEach((todo) => {
    firestoreTodoPath.doc(todo.id).update({
      ...todo.data(),
      description: '',
    })
  })
}
