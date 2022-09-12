import { Todo } from '../screens/todo/TodoScreen.types'

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

export function todoSortingConditionsMainScreen(a: Todo, b: Todo): number {
  let calc = a.category.localeCompare(b.category)
  return calc === 0 ? todoSortingConditions(a, b) : calc
}
