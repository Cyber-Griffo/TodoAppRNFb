import { TodoInputStyles } from './TodoInput.types'

export const getStyles = (): TodoInputStyles => {
  return {
    container: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 12
    },
    title: {
      marginTop: 20,
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
      backgroundColor: '#1AA3FF',
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
      fontWeight: "600",
      color: 'white'
    },
    textInput: {
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 20,
      marginVertical: 10
    }
  }
}