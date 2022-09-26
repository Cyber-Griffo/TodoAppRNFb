import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { CategoryLocal } from '../types/GeneralTypes'

export function handleCategoryRemovedChange(
  id: string,
  list: CategoryLocal[]
): CategoryLocal[] {
  return list.filter((category) => id !== category.id)
}
export function handleCategoryAddedChange(
  doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
  list: CategoryLocal[]
): CategoryLocal[] {
  if (list.find((category) => doc.id === category.id)) return list
  return [...list, { id: doc.id, title: doc.data().title }]
}
export function handleCategoryModifiedChange(
  doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
  list: CategoryLocal[]
): CategoryLocal[] {
  if (!list.find((category) => doc.id === category.id)) return list
  return list.map((category) => {
    if (category.id === doc.id) {
      return {
        id: doc.id,
        title: doc.data().title,
      }
    }
    return category
  })
}

export function sortCategoriesByCategoryString(
  list: CategoryLocal[]
): CategoryLocal[] {
  return list.sort((a, b) => {
    return a.title
      .toLocaleLowerCase()
      .localeCompare(b.title.toLocaleLowerCase())
  })
}
