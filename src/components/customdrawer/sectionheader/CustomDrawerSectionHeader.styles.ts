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
        backgroundColor: ctx.theme.placeholderLightColor,
      },
      ctx.lineColor !== undefined && {
        backgroundColor: ctx.lineColor,
      },
    ],
    textContainer: [
      {
        backgroundColor: ctx.theme.backgroundColor,
        paddingVertical: 8,
      },
      ctx.textBackground !== undefined && {
        backgroundColor: ctx.textBackground,
      },
    ],
    text: [
      {
        marginLeft: 12,
        color: ctx.theme.placeholderColor,
      },
      ctx.textColor !== undefined && {
        color: ctx.textColor,
      },
    ],
  }
}
