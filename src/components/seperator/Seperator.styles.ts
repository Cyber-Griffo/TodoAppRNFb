import { SeperatorStyleContext, SeperatorStyles } from './Seperator.types'

export const getStyles = (ctx: SeperatorStyleContext): SeperatorStyles => {
  return {
    line: [
      {
        width: '100%',
        height: 1,
        marginVertical: 0,
        backgroundColor: ctx.theme.primaryLightColor,
      },
    ],
  }
}
