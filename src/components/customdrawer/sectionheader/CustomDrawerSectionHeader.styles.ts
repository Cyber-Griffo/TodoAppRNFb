import {
  SectionHeaderStyles,
  SectionHeaderStylesContext,
} from './CustomDrawerSectionHeader.types'

export const getStyles = (
  ctx: SectionHeaderStylesContext
): SectionHeaderStyles => {
  return {
    breaker: [
      {
        width: '100%',
        height: 1,
        backgroundColor: ctx.theme.primaryLightColor,
      },
      ctx.lineColor !== undefined && {
        backgroundColor: ctx.lineColor,
      },
    ],
    textContainer: [
      {
        backgroundColor: ctx.theme.backgroundColor,
        paddingVertical: 6,
      },
      ctx.textBackground !== undefined && {
        backgroundColor: ctx.textBackground,
      },
    ],
    text: [
      {
        color: ctx.theme.darkGreyColor,
        fontSize: 14,
      },
      ctx.textColor !== undefined && {
        color: ctx.textColor,
      },
    ],
  }
}
