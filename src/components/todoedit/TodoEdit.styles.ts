import { TodoEditStyles, TodoEditStylesContext } from './TodoEdit.types'

export const getStyles = (ctx: TodoEditStylesContext): TodoEditStyles => {
  return {
    container: {
      width: '100%',
      padding: 12,
    },
  }
}
