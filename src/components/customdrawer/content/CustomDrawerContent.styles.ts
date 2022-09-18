import { HEADER_HEIGHT } from '../../../constants/StyleGuides'
import { CustomDrawerContentStyles } from './CustomDrawerContent.types'

export const getStyles = (): CustomDrawerContentStyles => {
  return {
    wrapper: [{ flex: 1, backgroundColor: 'white' }],
    headerWrapper: {
      justifyContent: 'flex-end',
      backgroundColor: 'white',
    },
    headerContainerWrapper: [{ flex: 1 }],
    headerContainer: {
      height: HEADER_HEIGHT + 6,
      width: '100%',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
    },
    headerTextInput: [
      {
        flex: 1,
        fontSize: 14,
        backgroundColor: 'white',
        paddingVertical: 0,
        color: '#0B2638',
        height: 34,
        borderRadius: 8,
        marginLeft: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#E6EDF2',
      },
    ],
    headerIconButtonContainer: { height: 30, width: 30 },
    headerIconButtonWrapper: { marginHorizontal: 12 },
    drawerContentScrollView: [{ zIndex: -1 }],
    iconStyle: [{ marginRight: 10 }],
  }
}
