import { HEADER_HEIGHT } from '../../../constants/StyleGuides'
import { CustomDrawerContentStyles } from './CustomDrawerContent.types'

export const getStyles = (): CustomDrawerContentStyles => {
  return {
    wrapper: [{ flex: 1, backgroundColor: 'white' }],
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
    headerContainerWrapper: [{ flex: 1 }],
    headerContainer: {
      height: HEADER_HEIGHT,
      width: '100%',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
    },
    headerTextInput: [
      {
        flex: 1,
        fontSize: 12,
        backgroundColor: 'white',
        paddingVertical: 0,
        color: 'black',
        height: 30,
        borderRadius: 8,
        marginLeft: 10,
        paddingHorizontal: 10,
      },
    ],
    headerIconButtonContainer: { height: 30, width: 30 },
    headerIconButtonWrapper: { marginHorizontal: 12 },
    breaker: [{ width: '100%', height: 1, backgroundColor: 'darkgrey' }],
    drawerContentScrollView: [{ zIndex: -1 }],
    iconStyle: [{ marginRight: 10 }],
  }
}
