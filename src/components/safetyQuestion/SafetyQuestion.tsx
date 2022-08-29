import React from 'react'
import { Text, View } from 'react-native'
import Button from '../button/Button'
import { getStyles } from './SafetyQuestion.styles'
import { Props as SafetyQuestionProps } from './SafetyQuestion.types'

const SafetyQuestion = (props: SafetyQuestionProps) => {
  const { acceptFunction, cancelFunction, title } = props
  const styles = getStyles()

  const displayMessage = `Are you sure you want to delete \n '${title}'?`

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{displayMessage}</Text>
      <View style={styles.buttonWrapper}>
        <Button
          value={'Yes'}
          rounded
          onPress={() => acceptFunction()}
          style={{
            wrapper: styles.touchableWrapper,
            text: styles.buttonText,
          }}
        />
        <Button
          value={'Cancel'}
          variant={'secondary'}
          rounded
          onPress={() => cancelFunction()}
          style={{
            wrapper: styles.touchableWrapper,
            text: styles.buttonText,
          }}
        />
      </View>
    </View>
  )
}

export default SafetyQuestion
