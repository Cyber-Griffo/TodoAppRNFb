import { HEADER_HEIGHT } from '../../../constants/StyleGuides'
import {
  CustomDrawerContentStyles,
  CustomDrawerContentStylesContext,
} from './CustomDrawerContent.types'

export const getStyles = (
  ctx: CustomDrawerContentStylesContext
): CustomDrawerContentStyles => {
  return {
    wrapper: [
      {
        flex: 1,
        backgroundColor: ctx.theme.backgroundColor,
      },
    ],
    headerWrapper: {
      justifyContent: 'flex-end',
      backgroundColor: ctx.theme.backgroundColor,
    },
    headerContainerWrapper: [
      {
        flex: 1,
      },
    ],
    headerContainer: {
      height: HEADER_HEIGHT * 1.25,
      width: '100%',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
    },
    headerHeading: {
      marginLeft: 12,
      fontSize: 24,
      color: ctx.theme.primaryColor,
      paddingRight: 12,
      fontWeight: '500',
    },
    headerTextInput: [
      {
        flex: 1,
        backgroundColor: ctx.theme.backgroundColor,
        height: 42,
        color: ctx.theme.darkColor,
        borderRadius: 8,
        marginLeft: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: ctx.theme.primaryLightColor,
        fontSize: 16,
      },
    ],
    headerIconButtonWrapper: {
      marginHorizontal: 12,
    },
    headerIcon: {
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    drawerContentScrollView: [
      {
        zIndex: -1,
        marginHorizontal: 0,
        paddingHorizontal: 0,
      },
    ],
    footerIconStyle: [
      {
        width: 26,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center',
      },
    ],
    footerContainer: {
      paddingHorizontal: 12,
      paddingBottom: 12,
    },
    footerButtonContainer: {
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    footerButtonText: {
      fontSize: 16,
      color: ctx.theme.darkColor,
    },
  }
}
