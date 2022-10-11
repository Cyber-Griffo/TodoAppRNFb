import React, { useContext, useImperativeHandle, useState } from 'react'
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
import { ThemeContext } from '../../utils/ThemeContext'

const TodoInput: React.ForwardRefRenderFunction<
  RefFunctions,
  TodoInputProps
> = (props: TodoInputProps, ref) => {
  const {
    cancelFunction,
    activeCategory,
    submitFunction,
    initialValue,
    submitButtonText,
  } = props
  //! PLACEHOLDER STRING ONLY FOR DEV-STAGE
  const [title, setTitle] = useState<string>(
    initialValue || faker.lorem.sentence(Math.floor(Math.random() * 10) + 1)
  )
  const [errorMessage, setErrorMessage] = useState<string>('')

  const { theme } = useContext(ThemeContext)
  const styles = getStyles({ theme })

  const INPUT_PLACEHOLDER = 'Title'

  useImperativeHandle(ref, () => ({
    isInputEmpty() {
      return title === '' ? true : false
    },
  }))

  const handleSubmitting = () => {
    // just create a new Todo if Title is provided
    if (!title) {
      setErrorMessage('Please enter a Title!')
      return
    }
    submitFunction(title, activeCategory)
    setTitle('')
  }

  // TODO: Add Select for All Categories

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Add new Todo</Text>
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
          placeholderTextColor={theme.primaryGreyColor}
          onSubmitEditing={() => handleSubmitting()}
          blurOnSubmit={false}
          autoFocus
        />
        <View style={styles.buttonWrapper}>
          <Button
            value={submitButtonText || 'Create'}
            rounded
            onPress={() => handleSubmitting()}
            style={{
              wrapper: styles.touchableWrapper,
              text: styles.buttonText,
            }}
          />
          <Button
            value={'Cancel'}
            variant={'error'}
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
    </TouchableWithoutFeedback>
  )
}

export default React.forwardRef(TodoInput)
