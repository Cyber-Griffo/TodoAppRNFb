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
    buttonContainer: {
      flex: 1,
      marginHorizontal: 10,
      paddingVertical: 12,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonAccept: {
      backgroundColor: '#1AA3FF',
    },
    buttonCancel: {
      borderWidth: 1,
      borderColor: '#1AA3FF',
    },
    buttonText: {
      fontWeight: '600',
      color: 'white',
    },
    buttonTextCancel: {
      color: '#1AA3FF',
    },
  }
}
