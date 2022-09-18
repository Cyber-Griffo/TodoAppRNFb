import {
  WelcomeScreenStyles,
  WelcomeScreenStylesContext,
} from './WelcomeScreen.types'

export const getStyles = (
  ctx: WelcomeScreenStylesContext
): WelcomeScreenStyles => {
  return {
    container: {
      flex: 1,
      backgroundColor: ctx.theme.primaryColor,
    },
    topContainer: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: ctx.theme.backgroundColor,
      borderBottomLeftRadius: 55,
    },
    illustration: {
      marginBottom: 10,
      marginLeft: 10,
    },
    bottomContainerWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: ctx.theme.backgroundColor,
    },
    bottomContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: ctx.theme.primaryColor,
      borderTopRightRadius: 55,
    },
    headerText: {
      marginBottom: 10,
      fontSize: 30,
      color: ctx.theme.primaryColor,
    },
    bottomHeaderText: {
      fontSize: 18,
      color: ctx.theme.backgroundColor,
    },
    bottomSubHeaderText: {
      fontSize: 14,
      color: ctx.theme.backgroundColor,
    },
    buttonWrapper: {
      width: '60%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: { justifyContent: 'space-between', paddingHorizontal: 20 },
  }
}
