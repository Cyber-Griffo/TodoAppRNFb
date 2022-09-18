import React, { useContext } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { Props as TodoElementProps } from './TodoElement.types'
import { getStyles } from './TodoElement.styles'
import { ThemeContext } from '../../utils/ThemeContext'

const TodoElement = (props: TodoElementProps) => {
  const { todo, onPress, onLongPress, displayCategoryTitle } = props
  const { theme } = useContext(ThemeContext)
  const styles = getStyles({ theme, done: todo.done })

  const prefix =
    displayCategoryTitle && todo.category !== '' ? todo.category : ''

  return (
    <TouchableHighlight
      onPress={() => onPress(todo.id)}
      onLongPress={() => onLongPress(todo.id)}
      style={styles.wrapper}
      activeOpacity={0.9}
    >
      <View style={styles.container}>
        <View style={styles.mark} />
        <View style={styles.titleWrapper}>
          {prefix && <Text style={styles.titlePrefix}>{prefix}</Text>}
          <Text style={styles.title}>{todo.title}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default TodoElement
