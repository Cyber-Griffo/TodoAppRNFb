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
        backgroundColor: '#E6EDF2',
      },
      ctx.lineColor !== undefined && {
        backgroundColor: ctx.lineColor,
      },
    ],
    textContainer: [
      {
        backgroundColor: 'white',
        paddingVertical: 8,
      },
      ctx.textBackground !== undefined && {
        backgroundColor: ctx.textBackground,
      },
    ],
    text: [
      {
        marginLeft: 12,
        color: '#A3B0B8',
      },
      ctx.textColor !== undefined && {
        color: ctx.textColor,
      },
    ],
  }
}
