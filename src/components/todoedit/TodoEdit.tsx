import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { getStyles } from './TodoEdit.styles'
import { Props as TodoEditProps } from './TodoEdit.types'
import { ThemeContext } from '../../utils/ThemeContext'
import TodoElement from '../todoelement/TodoElement'
import Seperator from '../seperator/Seperator'
import Button from '../button/Button'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const TodoEdit: React.FC<TodoEditProps> = (props): JSX.Element => {
  const { todo } = props

  const { theme } = useContext(ThemeContext)
  const styles = getStyles({ theme })

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {todo ? (
          <TodoElement
            todo={todo}
            pressable={false}
            style={{
              wrapper: {
                marginVertical: 12,
                marginHorizontal: 12,
              },
            }}
          />
        ) : (
          <Text style={styles.noTodoMessage}>No Todo Selected!</Text>
        )}
        <Seperator styles={{ marginVertical: 2 }} />
        <Button
          value="Edit Todo"
          onPress={() => props.handleEdit(todo?.title || '')}
          style={{ text: { fontSize: 16, color: theme.darkColor } }}
          pressEffectTextStyles={{ color: theme.darkGreyColor }}
          inverted
          iconRight={
            <MaterialCommunityIcon
              name="pencil-outline"
              size={22}
              color={theme.darkColor}
              style={styles.icon}
            />
          }
          showIconRight
        />
        <Seperator styles={{ marginVertical: 2 }} />
        <Button
          value="Delete Todo"
          onPress={() => props.handleDelete(todo?.id || '')}
          variant="error"
          style={{ text: { fontSize: 16 } }}
          inverted
          iconRight={
            <MaterialCommunityIcon
              name="trash-can-outline"
              size={22}
              color={theme.errorColor}
              style={styles.icon}
            />
          }
          showIconRight
        />
      </View>
    </View>
  )
}

export default TodoEdit
