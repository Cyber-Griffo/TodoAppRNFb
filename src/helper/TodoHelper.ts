import { Category, TodoLocal } from '../types/GeneralTypes'
import { checkForTimestamp } from './GeneralHelper'

export function findTodoById(
  id: string,
  todos: TodoLocal[]
): TodoLocal | undefined {
  return todos?.find((todo) => todo.id === id)
}

export function todoSortingConditions(a: TodoLocal, b: TodoLocal): number {
  return a.done === b.done
    ? checkForTimestamp(a.timestamp, b.timestamp)
    : a.done
    ? 1
    : -1
}

export function todoSortingConditionsMainScreen(
  a: TodoLocal,
  b: TodoLocal,
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
