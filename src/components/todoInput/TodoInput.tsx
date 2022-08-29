import React, { useImperativeHandle, useState } from 'react'
import {
  Keyboard,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { getStyles } from './TodoInput.styles'
import { RefFunctions, Props as TodoInputProps } from './TodoInput.types'

const TodoInput: React.ForwardRefRenderFunction<
  RefFunctions,
  TodoInputProps
> = (props: TodoInputProps, ref) => {
  const { cancelFunction, createFunction } = props

  const [title, setTitle] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const styles = getStyles()

  const INPUT_PLACEHOLDER = 'Title'

  useImperativeHandle(ref, () => ({
    isInputEmpty() {
      return title === '' ? true : false
    },
  }))

  const handleSubmitting = () => {
    // just create a new Todo if Title is provided
    if (title) {
      createFunction(title)
    } else {
      setErrorMessage('Please enter a Title!')
    }
    setTitle('')
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
            if (errorMessage) {
              setErrorMessage('')
            }
          }}
          style={styles.textInput}
          placeholder={INPUT_PLACEHOLDER}
          placeholderTextColor={'#A1A1A1'}
          onSubmitEditing={() => handleSubmitting()}
          blurOnSubmit={false}
          autoFocus={true}
        />
        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            onPress={() => handleSubmitting()}
            style={styles.touchableWrapper}
            activeOpacity={0.9}
          >
            <View style={[styles.buttonContainer, styles.buttonCreate]}>
              <Text style={styles.buttonText}>Create</Text>
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
    </TouchableWithoutFeedback>
  )
}

export default React.forwardRef(TodoInput)
