import React from 'react'
import { FlatList } from 'react-native'
import TodoElement from '../todoelement/TodoElement'
import { getStyles } from './TodoList.styles'
import { Props as TodoListProps } from './TodoList.types'

const TodoList = (props: TodoListProps) => {
  const { todos, todoOnLongPress, todoOnPress, displayTodoCategory } = props
  const styles = getStyles()

  return (
    <FlatList
      style={styles.list}
      data={todos}
      alwaysBounceVertical
      overScrollMode="always"
      showsVerticalScrollIndicator={false}
      renderItem={({ item: todo }) => (
        <TodoElement
          todo={todo}
          showCategory={displayTodoCategory}
          onPress={() => todoOnPress(todo.id)}
          onLongPress={() => todoOnLongPress(todo.id)}
          key={todo.id}
        />
      )}
      keyExtractor={({ id }) => id}
    />
  )
}

export default TodoList
