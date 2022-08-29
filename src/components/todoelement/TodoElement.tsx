import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { Props as TodoElementProps } from './TodoElement.types'
import { getStyles } from './TodoElement.styles'

const TodoElement = (props: TodoElementProps) => {
  const { done, title, onPress, id, onLongPress } = props
  const styles = getStyles({ done })

  return (
    <TouchableHighlight
      onPress={() => onPress(id)}
      onLongPress={() => onLongPress(id)}
      style={styles.wrapper}
      activeOpacity={0.9}
    >
      <View style={styles.container}>
        <View style={styles.mark} />
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

export default TodoElement
