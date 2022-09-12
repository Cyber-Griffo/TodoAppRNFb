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
        backgroundColor: 'white',
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
        color: 'black',
        fontSize: 16,
        marginRight: 16,
      },
      ctx.done && { color: 'darkgrey' },
    ],
    titlePrefix: [
      {
        color: '#278BCE',
        fontWeight: '600',
      },
      ctx.done && { color: '#95B7CF' },
    ],
    mark: [
      {
        width: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        marginLeft: 8,
        marginRight: 16,
        height: 10,
      },
      ctx.done && { backgroundColor: 'darkgrey', borderColor: 'darkgrey' },
    ],
  }
}
