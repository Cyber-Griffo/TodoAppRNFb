import { TodoListStyles } from './TodoList.types'

export const getStyles = (): TodoListStyles => {
  return {
    list: {
      zIndex: -1,
      paddingRight: 16,
      paddingLeft: 12,
    },
  }
}
