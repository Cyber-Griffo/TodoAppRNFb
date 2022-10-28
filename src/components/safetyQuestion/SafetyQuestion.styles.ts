import {
  SafetyQuestionStyles,
  SafetyQuestionStylesContext,
} from './SafetyQuestion.types'

export const getStyles = (
  ctx: SafetyQuestionStylesContext
): SafetyQuestionStyles => {
  return {
    container: {
      width: '80%',
      backgroundColor: ctx.theme.backgroundColor,
      borderRadius: 12,
      padding: 10,
    },
    title: {
      marginTop: 20,
      textAlign: 'center',
      fontSize: 16,
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
      marginHorizontal: 10,
      flex: 1,
    },
    buttonText: {
      fontWeight: '600',
    },
  }
}
