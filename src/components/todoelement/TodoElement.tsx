import React, { useContext } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { Props as TodoElementProps } from './TodoElement.types'
import { getStyles } from './TodoElement.styles'
import { ThemeContext } from '../../utils/ThemeContext'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const TodoElement = (props: TodoElementProps) => {
  const { todo, onPress, onLongPress, category } = props
  const { theme } = useContext(ThemeContext)
  const styles = getStyles({ theme, todo })

  return (
    <TouchableHighlight
      onPress={onPress}
      onLongPress={onLongPress}
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
          {category && <Text style={styles.category}>{category.title}</Text>}
          <Text style={styles.title}>{todo.title}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default TodoElement
