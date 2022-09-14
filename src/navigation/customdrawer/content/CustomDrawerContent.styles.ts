import { CustomDrawerContentStyles } from './CustomDrawerContent.types'

export const getStyles = (): CustomDrawerContentStyles => {
  return {
    wrapper: [{ flex: 1, backgroundColor: 'white' }],
    headerWrapper: [
      {
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
    ],
    headerContainer: [{ flex: 1, justifyContent: 'flex-end' }],
    headerTextInput: [{}],
    breaker: [{ width: '100%', height: 1, backgroundColor: 'darkgrey' }],
    drawerContentScrollView: [{ zIndex: -1 }],
    iconStyle: [{ marginRight: 10 }],
  }
}
