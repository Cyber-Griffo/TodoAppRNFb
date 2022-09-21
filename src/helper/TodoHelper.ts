import { Category, Todo } from '../types/GeneralTypes'

export function findTodoById(id: string, todos: Todo[]): Todo | undefined {
  return todos?.find((todo) => todo.id === id)
}

export function checkForTimestamp(a: Todo, b: Todo) {
  if (a.timestamp?.valueOf() < b.timestamp?.valueOf()) {
    return -1
  }
  return 1
}

export function todoSortingConditions(a: Todo, b: Todo): number {
  return a.done === b.done ? checkForTimestamp(a, b) : a.done ? 1 : -1
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
  return calc === 0 ? checkForTimestamp(a, b) : calc
}
