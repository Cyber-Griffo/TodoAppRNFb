import React, { useContext } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { Props as TodoElementProps } from './TodoElement.types'
import { getStyles } from './TodoElement.styles'
import { ThemeContext } from '../../utils/ThemeContext'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const TodoElement = (props: TodoElementProps) => {
  const { todo, onPress, onLongPress, displayCategoryTitle } = props
  const { theme } = useContext(ThemeContext)
  const styles = getStyles({ theme, todo })

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
        <View style={styles.mark}>
          {todo.done && (
            <FontAwesome
              name="check"
              color={theme.backgroundColor}
              size={9}
            />
          )}
        </View>
        <View style={styles.titleWrapper}>
          {prefix && <Text style={styles.category}>{prefix}</Text>}
          <Text style={styles.title}>{todo.title}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default TodoElement
