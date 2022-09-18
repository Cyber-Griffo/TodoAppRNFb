import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { ThemeContext } from '../../utils/ThemeContext'
import Button from '../button/Button'
import { getStyles } from './SafetyQuestion.styles'
import { Props as SafetyQuestionProps } from './SafetyQuestion.types'

const SafetyQuestion = (props: SafetyQuestionProps) => {
  const { theme } = useContext(ThemeContext)
  const { acceptFunction, cancelFunction, title } = props
  const styles = getStyles({ theme })

  const displayMessage = `Are you sure you want to delete \n '${title}'?`

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{displayMessage}</Text>
      <View style={styles.buttonWrapper}>
        <Button
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
