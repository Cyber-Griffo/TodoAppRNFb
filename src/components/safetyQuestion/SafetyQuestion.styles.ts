import { SafetyQuestionStyles } from './SafetyQuestion.types'

export const getStyles = (): SafetyQuestionStyles => {
  return {
    container: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 12,
    },
    title: {
      marginTop: 20,
      marginBottom: 30,
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '400',
      paddingHorizontal: 20,
      color: 'black',
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
