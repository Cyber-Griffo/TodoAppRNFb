import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { Category, CategoryCount, TodoFirebase } from '../types/GeneralTypes'
import { checkForTimestamp } from './GeneralHelper'

export function findTodoById(
  id: string,
  todos: TodoFirebase[]
): TodoFirebase | undefined {
  return todos?.find((todo) => todo.id === id)
}

export function todoSortingConditions(
  a: TodoFirebase,
  b: TodoFirebase
): number {
  return a.done === b.done
    ? checkForTimestamp(a.timestamp, b.timestamp)
    : a.done
    ? 1
    : -1
}

export function todoSortingConditionsMainScreen(
  a: TodoFirebase,
  b: TodoFirebase,
  categories: Category[]
): number {
  let categoryTitle = {
    a:
      categories
        .find((category) => category.id === a.categoryId)
        ?.title.toLocaleLowerCase() || '',
    b:
      categories
        .find((category) => category.id === b.categoryId)
        ?.title.toLocaleLowerCase() || '',
  }

  if (!categoryTitle.a && !categoryTitle.b) {
    return 0
  }

  let calc = categoryTitle.a.localeCompare(categoryTitle.b)
  return calc === 0 ? checkForTimestamp(a.timestamp, b.timestamp) : calc
}

export function handleTodoModifiedChange(
  doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
  list: TodoFirebase[]
): TodoFirebase[] {
  if (!list.find((todo) => todo.id === doc.id)) return list

  const { title, done, timestamp, categoryId } = doc.data() as TodoFirebase
  return list.map((todo) => {
    if (todo.id === doc.id) {
      return { id: doc.id, title, done, timestamp, categoryId }
    } else {
      return todo
    }
  })
}

export function handleTodoRemovedChange(
  id: string,
  todos: TodoFirebase[],
  categoryId: string,
  categoryCounts: CategoryCount[]
): { todos: TodoFirebase[]; categoryCounts: CategoryCount[] } {
  // Return if Todo isn't contained in List
  if (!todos.find((todo) => todo.id === id)) return { todos, categoryCounts }

  // Update CategoryCountList
  if (categoryCounts) {
    let categoryCountExists = categoryCounts.find(
      (cc) => cc.categoryId === categoryId
    )
    if (categoryCountExists) {
      categoryCounts = categoryCounts.map((categoryCount) => {
        if (categoryCount.categoryId === categoryId) {
          return {
            categoryId: categoryCount.categoryId,
            count: categoryCount.count--,
          }
        }
        return categoryCount
      })
    }
  }

  // Filter Todo List
  return { todos: todos.filter((todo) => todo.id !== id), categoryCounts }
}

export function handleTodoAddedChange(
  doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
  todos: TodoFirebase[],
  categoryCounts: CategoryCount[]
): { todos: TodoFirebase[]; categoryCounts: CategoryCount[] } {
  if (todos.find((todo) => todo.id === doc.id)) return { todos, categoryCounts }

  const { title, done, timestamp, categoryId } = doc.data() as TodoFirebase

  // Update CategoryCountList
  if (categoryCounts) {
    let categoryCountExists = categoryCounts.find(
      (cc) => cc.categoryId === categoryId
    )
    if (categoryCountExists) {
      categoryCounts.map((categoryCount) => {
        if (categoryCount.categoryId === categoryId) {
          return {
            categoryId: categoryCount.categoryId,
            count: categoryCount.count++,
          }
        }
        return categoryCount
      })
    } else {
      categoryCounts = [
        ...categoryCounts,
        { categoryId: (doc.data() as TodoFirebase).categoryId, count: 1 },
      ]
    }
  }

  return {
    todos: [...todos, { id: doc.id, title, done, timestamp, categoryId }],
    categoryCounts,
  }
}

export function sortTodosByDoneThenTimestamp(
  list: TodoFirebase[]
): TodoFirebase[] {
  console.log('h')
  return list.sort((a, b) => {
    return todoSortingConditions(a, b)
  })
}
