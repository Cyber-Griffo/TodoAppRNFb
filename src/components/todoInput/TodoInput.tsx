import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableNativeFeedback,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'
import { getStyles } from './TodoInput.styles'
import { Props as TodoInputProps } from './TodoInput.types'

const TodoInput = (props: TodoInputProps) => {
  const { cancelFunction, createFunction } = props

  const [title, setTitle] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const styles = getStyles()

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Please enter a new Todo:</Text>
        <TextInput
          value={title}
          onChangeText={(text) => {
            setTitle(text)
            if (errorMessage) setErrorMessage("")
          }}
          style={styles.textInput}
        />
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        <View style={styles.buttonWrapper}>
          <TouchableNativeFeedback onPress={() => {
            // just create a new Todo if Title is provided
            if (title) {
              createFunction(title)
            } else {
              setErrorMessage("Please enter a Title!")
            }
            setTitle("")
          }}>
            <View style={[styles.buttonContainer, { backgroundColor: '#1AA3FF' }]}>
              <Text style={styles.buttonText}>Create</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => cancelFunction()}>
            <View style={[styles.buttonContainer, { backgroundColor: '#FF5252' }]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default TodoInput