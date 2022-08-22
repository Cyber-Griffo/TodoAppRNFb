import React from 'react'
import {
  View,
  Text,
  TouchableNativeFeedback,
} from 'react-native'
import { getStyles } from './SafetyQuestion.styles'
import { Props as SafetyQuestionProps } from './SafetyQuestion.types'

const SafetyQuestion = (props: SafetyQuestionProps) => {
  const { acceptFunction, cancelFunction, title } = props
  const styles = getStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you sure you want to delete "{title}"?</Text>
      <View style={styles.buttonWrapper}>
        <TouchableNativeFeedback onPress={() => acceptFunction()}>
          <View style={[styles.buttonContainer, styles.buttonAccept]}>
            <Text style={styles.buttonText}>Yes</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => cancelFunction()}>
          <View style={[styles.buttonContainer, styles.buttonCancel]}>
            <Text style={[styles.buttonText, styles.buttonTextCancel]}>Cancel</Text>
          </View>
        </TouchableNativeFeedback>
      </View >
    </View >
  )
}

export default SafetyQuestion