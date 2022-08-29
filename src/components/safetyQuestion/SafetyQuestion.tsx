import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
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
        <TouchableHighlight
          onPress={() => acceptFunction()}
          style={styles.touchableWrapper}
          activeOpacity={0.9}
        >
          <View style={[styles.buttonContainer, styles.buttonAccept]}>
            <Text style={styles.buttonText}>Yes</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => cancelFunction()}
          style={styles.touchableWrapper}
          activeOpacity={0.9}
        >
          <View style={[styles.buttonContainer, styles.buttonCancel]}>
            <Text style={[styles.buttonText, styles.buttonTextCancel]}>
              Cancel
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
}

export default SafetyQuestion
