import { ButtonStyleContext, ButtonStyles } from './Button.types'

export const getStyles = (ctx: ButtonStyleContext): ButtonStyles => {
  return {
    buttonTouchable: [
      {},
      ctx.rounded && {
        borderRadius: ctx.borderRadius + 1,
      },
      ctx.variant === 'secondary' && {
        borderColor: 'white',
      },
    ],
    buttonView: [
      {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#278BCE',
        flexDirection: 'row',
      },
      ctx.iconButton && {
        padding: 0,
      },
      !ctx.iconButton && {
        paddingVertical: 12,
      },
      ctx.variant === 'secondary' && {
        backgroundColor: 'white',
      },
      ctx.rounded && {
        borderRadius: ctx.borderRadius,
      },
    ],
    text: [
      {
        color: 'white',
      },
      ctx.variant === 'secondary' && {
        color: '#278BCE',
      },
    ],
  }
}
