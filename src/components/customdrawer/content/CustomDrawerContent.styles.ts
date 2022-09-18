import { HEADER_HEIGHT } from '../../../constants/StyleGuides'
import {
  CustomDrawerContentStyles,
  CustomDrawerContentStylesContext,
} from './CustomDrawerContent.types'

export const getStyles = (
  ctx: CustomDrawerContentStylesContext
): CustomDrawerContentStyles => {
  return {
    wrapper: [{ flex: 1, backgroundColor: ctx.theme.backgroundColor }],
    headerWrapper: {
      justifyContent: 'flex-end',
      backgroundColor: ctx.theme.backgroundColor,
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
        backgroundColor: ctx.theme.backgroundColor,
        paddingVertical: 0,
        color: ctx.theme.darkColor,
        height: 34,
        borderRadius: 8,
        marginLeft: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: ctx.theme.placeholderColor,
      },
    ],
    headerIconButtonContainer: { height: 30, width: 30 },
    headerIconButtonWrapper: { marginHorizontal: 12 },
    drawerContentScrollView: [{ zIndex: -1 }],
    iconStyle: [{ marginRight: 10 }],
  }
}
