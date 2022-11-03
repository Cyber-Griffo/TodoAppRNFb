import { FOOTER_HEIGHT, HEADER_HEIGHT } from '../../constants/StyleGuides'
import { TodoScreenStyleContext, TodoScreenStyles } from './TodoScreen.types'

export const getStyles = (ctx: TodoScreenStyleContext): TodoScreenStyles => {
  return {
    wrapperContainer: {
      height: '100%',
      width: '100%',
      backgroundColor: ctx.theme.backgroundColor,
    },
    headerWrapper: {
      justifyContent: 'flex-end',
      backgroundColor: ctx.theme.primaryColor,

      shadowColor: ctx.theme.darkColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    headerContainer: {
      height: HEADER_HEIGHT,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      color: ctx.theme.backgroundColor,
      fontWeight: '500',
      fontSize: 24,
    },
    menuIcon: {
      position: 'absolute',
      left: 16,
    },
    footerButton: {
      width: '100%',
      height: FOOTER_HEIGHT,
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerText: {
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
      color: ctx.theme.darkColor,
      fontWeight: '600',
      fontSize: 18,
    },
    todoEditModalContainer: {
      justifyContent: 'flex-end',
    },
    safeAreaBottomContainer: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
      backgroundColor: ctx.theme.primaryColor,
    },
  }
}
