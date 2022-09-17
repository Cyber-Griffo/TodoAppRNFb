import { WelcomeScreenStyles } from './WelcomeScreen.types'

export const getStyles = (): WelcomeScreenStyles => {
  return {
    container: {
      flex: 1,
      backgroundColor: '#278bce',
    },
    topContainer: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: 'white',
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
      backgroundColor: 'white',
    },
    bottomContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: '#278bce',
      borderTopRightRadius: 55,
    },
    headerText: {
      marginBottom: 10,
      fontSize: 30,
      color: '#278bce',
    },
    bottomHeaderText: {
      fontSize: 18,
      color: 'white',
    },
    bottomSubHeaderText: {
      fontSize: 14,
      color: 'white',
    },
    buttonWrapper: {
      width: '60%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: { justifyContent: 'space-between', paddingHorizontal: 20 },
  }
}
