import { TodoScreenStyleContext, TodoScreenStyles } from './TodoScreen.types'

export const getStyles = (ctx: TodoScreenStyleContext): TodoScreenStyles => {
  return {
    wrapperContainer: {
      height: '100%',
      width: '100%',
      backgroundColor: 'white',
    },
    headerWrapper: {
      justifyContent: 'flex-end',
      backgroundColor: '#1AA3FF',

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    headerContainer: {
      height: ctx.HEADER_HEIGHT,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      color: 'white',
      fontWeight: '500',
      fontSize: 18,
    },
    list: {
      zIndex: -1,
    },
    footerButton: {
      width: '100%',
      height: ctx.FOOTER_HEIGHT,
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerText: {
      color: '#1AA3FF',
      fontSize: 18,
    },

    // Loading State
    loadingScreenContainer: {
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingScreenText: {
      color: 'black',
      fontWeight: '600',
      fontSize: 18,
    },
  }
}
