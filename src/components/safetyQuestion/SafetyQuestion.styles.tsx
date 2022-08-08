import { SafetyQuestionStyles } from './SafetyQuestion.types'

export const getStyles = (): SafetyQuestionStyles => {
  return {
    container: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 12
    },
    title: {
      marginTop: 20,
      marginBottom: 30,
      textAlign: 'center',
      fontSize: 16,
      fontWeight: "400",
      paddingHorizontal: 20,
      color: 'black'
    },
    buttonWrapper: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-evenly',
      marginBottom: 20
    },
    buttonContainer: {
      flex: 1,
      marginHorizontal: 10,
      paddingVertical: 12,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
      fontWeight: "600",
      color: 'white'
    },
  }
}