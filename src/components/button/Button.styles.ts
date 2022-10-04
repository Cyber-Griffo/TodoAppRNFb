import { FOOTER_HEIGHT } from '../../constants/StyleGuides'
import { ButtonStyleContext, ButtonStyles } from './Button.types'

export const getStyles = (ctx: ButtonStyleContext): ButtonStyles => {
  return {
    buttonWrapper: [
      { width: '100%', height: FOOTER_HEIGHT },
      ctx.variant === 'secondary' && {
        borderColor: ctx.backgroundColor,
      },
    ],
    buttonContainer: [
      {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ctx.backgroundColor,
        flexDirection: 'row',
      },
      ctx.iconButton && {
        padding: 0,
      },
      !ctx.iconButton && {
        paddingVertical: 12,
      },
      ctx.rounded && {
        borderRadius: ctx.borderRadius,
      },
    ],
    text: [
      {
        color: ctx.textColor,
      },
    ],
  }
}
