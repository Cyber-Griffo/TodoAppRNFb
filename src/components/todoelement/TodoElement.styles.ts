import { STRING_ALL_TODOS } from '../../constants/Firebase'
import { TodoElementStyleContext, TodoElementStyles } from './TodoElement.types'

export const getStyles = (ctx: TodoElementStyleContext): TodoElementStyles => {
  return {
    wrapper: [
      {
        marginVertical: 6,
        marginHorizontal: 12,
        borderRadius: 13,
      },
    ],
    container: [
      {
        backgroundColor: ctx.theme.backgroundColor,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 12,
      },
      ctx.todo.done && {
        backgroundColor: ctx.theme.primaryLightColor,
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
        marginRight: 12,
      },
      ctx.todo.done && { color: ctx.theme.darkGreyColor },
      ctx.todo.categoryId !== STRING_ALL_TODOS && {
        marginTop: 1,
      },
    ],
    titlePressed: {
      opacity: 0.7,
    },
    categoryTitle: [
      {
        color: ctx.theme.primaryColor,
        fontSize: 14,
        marginRight: 12,
      },
      ctx.todo.done && { color: ctx.theme.primaryGreyColor },
      ctx.todo.categoryId !== STRING_ALL_TODOS && {
        marginBottom: 1,
      },
    ],
    categoryTitlePressed: {
      opacity: 0.7,
    },
    mark: [
      {
        height: 16,
        aspectRatio: 1,
        borderRadius: 8,
        backgroundColor: ctx.theme.accentColor,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
      },
      ctx.todo.done && {
        backgroundColor: ctx.theme.accentGreyColor,
        borderColor: ctx.theme.accentGreyColor,
      },
    ],
    markPressed: {
      opacity: 0.7,
    },
    markFiller: {
      height: '75%',
      aspectRatio: 1,
      borderRadius: 20,
      backgroundColor: ctx.theme.backgroundColor,
    },
    markFillerPressed: { backgroundColor: 'trasparent' },
  }
}
