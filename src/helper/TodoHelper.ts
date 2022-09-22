import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { Category, Todo } from '../types/GeneralTypes'
import { checkForTimestamp } from './GeneralHelper'

export function findTodoById(id: string, todos: Todo[]): Todo | undefined {
  return todos?.find((todo) => todo.id === id)
}

export function todoSortingConditions(a: Todo, b: Todo): number {
  return a.done === b.done
    ? checkForTimestamp(a.timestamp, b.timestamp)
    : a.done
    ? 1
    : -1
}

export function todoSortingConditionsMainScreen(
  a: Todo,
  b: Todo,
  categories: Category[]
): number {
  let categoryTitle = {
    a: categories.find((category) => category.id === a.categoryId)?.title || '',
    b: categories.find((category) => category.id === b.categoryId)?.title || '',
  }

  if (!categoryTitle.a && !categoryTitle.b) {
    return 0
  }

  let calc = categoryTitle.a.localeCompare(categoryTitle.b)
  return calc === 0 ? checkForTimestamp(a.timestamp, b.timestamp) : calc
}

export function handleTodoModifiedChange(
  doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
  list: Todo[]
): Todo[] {
  if (!list.find((todo) => todo.id === doc.id)) return list

  const { title, done, timestamp, categoryId } = doc.data() as Todo
  return list
    .map((todo) => {
      if (todo.id === doc.id) {
        return { id: doc.id, title, done, timestamp, categoryId }
      } else {
        return todo
      }
    })
    .sort((a, b) => {
      return todoSortingConditions(a, b)
    })
}

export function sortTodosByDoneThenTimestamp(list: Todo[]): Todo[] {
  return list.sort((a, b) => {
    return todoSortingConditions(a, b)
  })
}
