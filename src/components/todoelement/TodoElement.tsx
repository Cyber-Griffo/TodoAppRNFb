import React, { useContext } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Props as TodoElementProps } from './TodoElement.types'
import { getStyles } from './TodoElement.styles'
import { ThemeContext } from '../../utils/ThemeContext'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useTodoStore } from '../../zustand/TodoStore'

const TodoElement = (props: TodoElementProps) => {
  const {
    todo,
    onPress,
    onLongPress,
    showCategory = true,
    pressable = true,
  } = props
  const { theme } = useContext(ThemeContext)
  const styles = getStyles({ theme, todo })
  const categories = useTodoStore((state) => state.categories)

  const category =
    todo.categoryId !== ' '
      ? categories.find((c) => c.id === todo.categoryId)
      : ''

  return (
    <View style={[styles.wrapper, props.style?.wrapper]}>
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={!pressable}
      >
        {({ pressed }) => (
          <View
            style={[
              styles.container,
              pressed && {
                backgroundColor: theme.primaryLightColor,
                transform: [{ scale: 1 }],
              },
            ]}
          >
            <View style={styles.mark}>
              {todo.done && (
                <FontAwesome
                  name="check"
                  color={theme.backgroundColor}
                  size={12}
                />
              )}
            </View>
            <View style={styles.titleWrapper}>
              {showCategory && category && (
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
