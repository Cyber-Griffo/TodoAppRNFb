import { FOOTER_HEIGHT, HEADER_HEIGHT } from '../../constants/StyleGuides'
import { TodoScreenStyles } from './TodoScreen.types'

export const getStyles = (): TodoScreenStyles => {
  return {
    wrapperContainer: {
      height: '100%',
      width: '100%',
      backgroundColor: 'white',
    },
    headerWrapper: {
      justifyContent: 'flex-end',
      backgroundColor: '#278BCE',

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
      height: HEADER_HEIGHT,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      color: 'white',
      fontWeight: '500',
      fontSize: 18,
    },
    menuIcon: {
      position: 'absolute',
      left: 15,
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
      color: 'black',
      fontWeight: '600',
      fontSize: 18,
    },
  }
}
