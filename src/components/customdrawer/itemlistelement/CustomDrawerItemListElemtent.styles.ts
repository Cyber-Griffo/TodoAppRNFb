import {
  CustomDrawerItemListElemtentStyleContext,
  CustomDrawerItemListElemtentStyles,
} from './CustomDrawerItemListElemtent.types'

export const getStyles = (
  ctx: CustomDrawerItemListElemtentStyleContext
): CustomDrawerItemListElemtentStyles => {
  return {
    wrapper: {
      width: '100%',
      paddingHorizontal: 12,
      marginVertical: 4,
    },
    pressable: {
      flex: 1,
    },
    containerWrapper: {
      width: '100%',
      position: 'relative',
      borderRadius: 12,
      overflow: 'hidden',
    },
    containerWrapperPressed: {
      backgroundColor: '#DBE7F0',
      transform: [{ scale: 0.99 }],
    },
    container: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between',
    },
    containerFocused: {
      paddingLeft: 18,
    },
    textFocused: {
      fontWeight: '500',
    },
    categoryCountText: {
      fontSize: 14,
      fontWeight: '500',
      color: ctx.theme.accentGreyColor,
    },
    categoryCountTextFocused: {
      color: ctx.theme.accentColor,
      fontWeight: '600',
    },
    focusedMarker: {
      height: '100%',
      width: 6,
      backgroundColor: ctx.theme.primaryColor,
      position: 'absolute',
    },
  }
}
