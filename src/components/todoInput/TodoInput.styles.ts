import { TodoInputStyles, TodoInputStylesContext } from './TodoInput.types'

export const getStyles = (ctx: TodoInputStylesContext): TodoInputStyles => {
  return {
    container: {
      width: '80%',
      backgroundColor: ctx.theme.backgroundColor,
      borderRadius: 12,
      padding: 20,
    },
    title: {
      textAlign: 'center',
      fontSize: 22,
      fontWeight: '500',
      paddingHorizontal: 20,
      color: ctx.theme.darkColor,
    },
    buttonWrapper: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-evenly',
    },
    touchableWrapper: {
      flex: 1,
    },
    buttonText: {
      fontWeight: '600',
    },
    textInput: {
      borderColor: ctx.theme.primaryGreyColor,
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      color: ctx.theme.darkColor,
    },
  }
}
