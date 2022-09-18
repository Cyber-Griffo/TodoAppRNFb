import { ButtonStyleContext, ButtonStyles } from './Button.types'

export const getStyles = (ctx: ButtonStyleContext): ButtonStyles => {
  return {
    buttonTouchable: [
      {},
      ctx.rounded && {
        borderRadius: ctx.borderRadius + 1,
      },
      ctx.variant === 'secondary' && {
        borderColor: ctx.theme.backgroundColor,
      },
    ],
    buttonView: [
      {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ctx.theme.primaryColor,
        flexDirection: 'row',
      },
      ctx.iconButton && {
        padding: 0,
      },
      !ctx.iconButton && {
        paddingVertical: 12,
      },
      ctx.variant === 'secondary' && {
        backgroundColor: ctx.theme.backgroundColor,
      },
      ctx.rounded && {
        borderRadius: ctx.borderRadius,
      },
    ],
    text: [
      {
        color: ctx.theme.backgroundColor,
      },
      ctx.variant === 'secondary' && {
        color: ctx.theme.primaryColor,
      },
    ],
  }
}
