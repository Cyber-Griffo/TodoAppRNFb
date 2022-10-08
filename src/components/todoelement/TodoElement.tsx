import React, { useContext } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Props as TodoElementProps } from './TodoElement.types'
import { getStyles } from './TodoElement.styles'
import { ThemeContext } from '../../utils/ThemeContext'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const TodoElement = (props: TodoElementProps) => {
  const { todo, onPress, onLongPress, category } = props
  const { theme } = useContext(ThemeContext)
  const styles = getStyles({ theme, todo })

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={{ flex: 1 }}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        {({ pressed }) => (
          <View
            style={[
              styles.container,
              pressed && { backgroundColor: theme.primaryLightColor },
            ]}
          >
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
              {category && (
                <Text style={styles.category}>{category.title}</Text>
              )}
              <Text style={styles.title}>{todo.title}</Text>
            </View>
          </View>
        )}
      </Pressable>
    </View>
  )
}

export default TodoElement
