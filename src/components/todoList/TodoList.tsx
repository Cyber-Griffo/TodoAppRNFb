import React from 'react'
import { FlatList } from 'react-native'
import TodoElement from '../todoelement/TodoElement'
import { getStyles } from './TodoList.styles'
import { Props as TodoListProps } from './TodoList.types'

const TodoList = (props: TodoListProps) => {
  const { todos, todoOnLongPress, todoOnPress } = props
  const styles = getStyles()

  return (
    <FlatList
      style={styles.list}
      data={todos}
      renderItem={({ item }) => (
        <TodoElement
          done={item.done}
          title={item.title}
          id={item.id}
          onPress={todoOnPress}
          onLongPress={todoOnLongPress}
        />
      )}
      keyExtractor={({ id }) => id}
    />
  )
}

export default TodoList
