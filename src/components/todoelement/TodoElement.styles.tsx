import { TodoElementStyleContext, TodoElementStyles } from './TodoElement.types'

export const getStyles = (ctx: TodoElementStyleContext): TodoElementStyles => {
  return {
    container: [{
      backgroundColor: 'white',
      padding: 8,
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 8,
      width: '100%',
    }],
    title: [{
      color: 'black',
      fontSize: 16,
      marginRight: 16
    },
    ctx.done && { color: 'darkgrey' }],
    mark: [{
      height: 10,
      width: 10,
      borderRadius: 10,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'black',
      marginLeft: 8,
      marginRight: 16,
    },
    ctx.done && { backgroundColor: 'darkgrey', borderColor: 'darkgrey' }],
    wrapper: [{
      borderRadius: 8,
      marginVertical: 4,
      marginHorizontal: 6
    }]
  }
}