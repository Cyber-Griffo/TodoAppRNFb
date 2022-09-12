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
      renderItem={({ item }) => (
        <TodoElement
          todo={item}
          onPress={() => todoOnPress(item.id, item.done)}
          onLongPress={todoOnLongPress}
          key={item.id}
          displayCategoryTitle={displayTodoCategory}
        />
      )}
      keyExtractor={({ id }) => id}
    />
  )
}

export default TodoList
