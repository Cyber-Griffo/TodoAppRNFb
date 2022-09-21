import React from 'react'
import { FlatList } from 'react-native'
import TodoElement from '../todoelement/TodoElement'
import { getStyles } from './TodoList.styles'
import { Props as TodoListProps } from './TodoList.types'

const TodoList = (props: TodoListProps) => {
  const {
    todos,
    todoOnLongPress,
    todoOnPress,
    displayTodoCategory,
    categories,
  } = props
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
          category={
            displayTodoCategory
              ? categories.find((category) => category.id === todo.categoryId)
              : undefined
          }
          onPress={() => todoOnPress(todo.id, todo.done)}
          onLongPress={todoOnLongPress}
          key={todo.id}
        />
      )}
      keyExtractor={({ id }) => id}
    />
  )
}

export default TodoList
