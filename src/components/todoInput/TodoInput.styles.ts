import { TodoInputStyles } from './TodoInput.types'

export const getStyles = (): TodoInputStyles => {
  return {
    container: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 12,
    },
    title: {
      marginTop: 20,
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
    textInput: {
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 20,
      marginVertical: 20,
      color: 'black',
    },
    errorText: {
      marginTop: 5,
      color: 'red',
      textAlign: 'center',
    },
  }
}
