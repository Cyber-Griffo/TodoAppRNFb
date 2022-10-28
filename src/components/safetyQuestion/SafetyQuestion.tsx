import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { ThemeContext } from '../../utils/ThemeContext'
import Button from '../button/Button'
import TodoElement from '../todoelement/TodoElement'
import { getStyles } from './SafetyQuestion.styles'
import { Props as SafetyQuestionProps } from './SafetyQuestion.types'

const SafetyQuestion = (props: SafetyQuestionProps) => {
  const { theme } = useContext(ThemeContext)
  const { acceptFunction, cancelFunction, todo } = props
  const styles = getStyles({ theme })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Are you sure you want to delete the Todo:
      </Text>
      {todo ? (
        <TodoElement
          todo={todo}
          pressable={false}
          style={{
            wrapper: {
              marginVertical: 12,
            },
          }}
        />
      ) : (
        <Text style={styles.noTodoMessage}>No Todo Selected!</Text>
      )}
      <View style={styles.buttonWrapper}>
        <Button
          variant={'error'}
          value={'Delete'}
          rounded
          onPress={() => acceptFunction()}
          style={{
            wrapper: styles.touchableWrapper,
            text: styles.buttonText,
            container: { backgroundColor: theme.errorColor },
          }}
        />
        <Button
          value={'Cancel'}
          variant={'primary'}
          rounded
          onPress={() => cancelFunction()}
          style={{
            wrapper: styles.touchableWrapper,
            text: styles.buttonText,
          }}
          inverted
        />
      </View>
    </View>
  )
}

export default SafetyQuestion
