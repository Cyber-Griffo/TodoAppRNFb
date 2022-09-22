import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { Category } from '../types/GeneralTypes'

export function handleCategoryRemovedChange(
  id: string,
  list: Category[]
): Category[] {
  return list.filter((category) => id !== category.id)
}
export function handleCategoryAddedChange(
  doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
  list: Category[]
): Category[] {
  if (list.find((category) => doc.id === category.id)) return list
  return [...list, { id: doc.id, title: doc.data().title }]
}
export function handleCategoryModifiedChange(
  doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
  list: Category[]
): Category[] {
  if (!list.find((category) => doc.id === category.id)) return list
  return list
    .map((category) => {
      if (category.id === doc.id) {
        return {
          id: doc.id,
          title: doc.data().title,
        }
      }
      return category
    })
    .sort((a, b) => {
      return a.title.localeCompare(b.title)
    })
}

export function sortCategoriesByCaegoryString(list: Category[]): Category[] {
  return list.sort((a, b) => {
    return a.title.localeCompare(b.title)
  })
}
