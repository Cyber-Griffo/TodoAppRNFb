import { TodoElementStyleContext, TodoElementStyles } from './TodoElement.types'

export const getStyles = (ctx: TodoElementStyleContext): TodoElementStyles => {
  return {
    wrapper: [
      {
        marginVertical: 4,
        marginHorizontal: 6,
        borderRadius: 8,
      },
    ],
    container: [
      {
        backgroundColor: ctx.theme.backgroundColor,
        padding: 8,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
      },
    ],
    titleWrapper: [
      {
        flex: 1,
        height: '100%',
      },
    ],
    title: [
      {
        color: ctx.theme.darkColor,
        fontSize: 16,
        marginRight: 16,
      },
      ctx.done && { color: ctx.theme.placeholderColor },
    ],
    titlePrefix: [
      {
        color: ctx.theme.primaryColor,
        fontWeight: '600',
      },
      ctx.done && { color: ctx.theme.primaryLightColor },
    ],
    mark: [
      {
        width: 10,
        borderRadius: 10,
        backgroundColor: ctx.theme.backgroundColor,
        borderWidth: 1,
        borderColor: ctx.theme.darkColor,
        marginLeft: 8,
        marginRight: 16,
        height: 10,
      },
      ctx.done && {
        backgroundColor: ctx.theme.placeholderColor,
        borderColor: ctx.theme.placeholderColor,
      },
    ],
  }
}
