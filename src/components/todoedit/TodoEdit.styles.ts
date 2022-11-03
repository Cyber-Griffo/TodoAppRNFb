import { TodoEditStyles, TodoEditStylesContext } from './TodoEdit.types'

export const getStyles = (ctx: TodoEditStylesContext): TodoEditStyles => {
  return {
    wrapper: {
      width: '100%',
      padding: 12,
    },
    container: {
      borderRadius: 12,
      width: '100%',
      backgroundColor: ctx.theme.backgroundColor,
      paddingHorizontal: 12,
    },
    noTodoMessage: {
      marginVertical: 12,
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 20,
      color: ctx.theme.primaryColor,
    },
    icon: {
      marginLeft: 12,
    },
  }
}
