import { TodoInputStyles, TodoInputStylesContext } from './TodoInput.types'

export const getStyles = (ctx: TodoInputStylesContext): TodoInputStyles => {
  return {
    container: {
      width: '80%',
      backgroundColor: ctx.theme.backgroundColor,
      borderRadius: 12,
    },
    title: {
      marginTop: 20,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '400',
      paddingHorizontal: 20,
      color: ctx.theme.darkColor,
    },
    buttonWrapper: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-evenly',
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    touchableWrapper: {
      flex: 1,
      paddingHorizontal: 10,
    },
    buttonText: {
      fontWeight: '600',
    },
    textInput: {
      borderColor: ctx.theme.primaryGreyColor,
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 20,
      marginVertical: 20,
      color: ctx.theme.darkColor,
    },
    errorText: {
      marginTop: 10,
      marginBottom: -12,
      color: ctx.theme.errorColor,
      marginLeft: 28,
    },
  }
}
