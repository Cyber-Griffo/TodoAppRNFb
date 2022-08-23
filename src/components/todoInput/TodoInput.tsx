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

  const INPUT_PLACEHOLDER = 'Title'

  const styles = getStyles()

  const handleSubmitting = () => {
    // just create a new Todo if Title is provided
    if (title) {
      createFunction(title)
    } else {
      setErrorMessage("Please enter a Title!")
    }
    setTitle("")
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Please enter a new Todo:</Text>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        <TextInput
          value={title}
          onChangeText={(text) => {
            setTitle(text)
            if (errorMessage) setErrorMessage("")
          }}
          style={styles.textInput}
          placeholder={INPUT_PLACEHOLDER}
          placeholderTextColor={'#A1A1A1'}
          onSubmitEditing={() => handleSubmitting()}
        />
        <View style={styles.buttonWrapper}>
          <TouchableNativeFeedback onPress={() => handleSubmitting()}>
            <View style={[styles.buttonContainer, styles.buttonCreate]}>
              <Text style={styles.buttonText}>Create</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => cancelFunction()}>
            <View style={[styles.buttonContainer, styles.buttonCancel]}>
              <Text style={[styles.buttonText, styles.buttonTextCancel]}>Cancel</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default TodoInput