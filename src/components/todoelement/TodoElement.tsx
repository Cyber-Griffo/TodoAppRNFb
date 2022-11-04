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
    pressEffectScale = 0.99,
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
                transform: [{ scale: pressEffectScale }],
              },
            ]}
          >
            <View
              style={[
                styles.mark,
                pressed && {
                  opacity: 0.7,
                },
              ]}
            >
              {todo.done ? (
                <FontAwesome
                  name="check"
                  color={theme.backgroundColor}
                  size={12}
                />
              ) : (
                <View
                  style={[
                    {
                      height: '75%',
                      aspectRatio: 1,
                      borderRadius: 20,
                      backgroundColor: theme.backgroundColor,
                    },
                    pressed && { backgroundColor: 'transparent' },
                  ]}
                />
              )}
            </View>
            <View style={styles.titleWrapper}>
              {showCategory && category && (
                <Text style={[styles.category, pressed && { opacity: 0.7 }]}>
                  {category.title}
                </Text>
              )}
              <Text style={[styles.title, pressed && { opacity: 0.7 }]}>
                {todo.title}
              </Text>
            </View>
          </View>
        )}
      </Pressable>
    </View>
  )
}

export default TodoElement
