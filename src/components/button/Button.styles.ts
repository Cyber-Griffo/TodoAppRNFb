import { ButtonStyleContext, ButtonStyles } from './Button.types'

export const getStyles = (ctx: ButtonStyleContext): ButtonStyles => {
  return {
    buttonTouchable: [
      {},
      ctx.rounded && {
        borderRadius: 8,
      },
    ],
    buttonView: [
      {
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#278BCE',
      },
      ctx.variant === 'secondary' && {
        backgroundColor: 'white',
      },
      ctx.rounded && {
        borderRadius: 8,
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
