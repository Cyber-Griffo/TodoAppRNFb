import React, { useImperativeHandle, useState } from 'react'
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Button from '../button/Button'
import { getStyles } from './TodoInput.styles'
import { RefFunctions, Props as TodoInputProps } from './TodoInput.types'
import { faker } from '@faker-js/faker'

const TodoInput: React.ForwardRefRenderFunction<
  RefFunctions,
  TodoInputProps
> = (props: TodoInputProps, ref) => {
  const { cancelFunction, createFunction } = props

  //! PLACEHOLDER STRING ONLY FOR DEV-STAGE
  const [title, setTitle] = useState<string>(
    faker.lorem.sentence(Math.floor(Math.random() * 10) + 1)
  )
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
          <Button
            value={'Create'}
            rounded
            onPress={() => handleSubmitting()}
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
              text: [styles.buttonText, { color: '#de5950' }],
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default React.forwardRef(TodoInput)
