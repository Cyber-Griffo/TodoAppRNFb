import React, { useContext, useImperativeHandle, useState } from 'react'
import {
  ColorValue,
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
    titleText,
  } = props
  //! PLACEHOLDER STRING ONLY FOR DEV-STAGE
  const [title, setTitle] = useState<string>(
    initialValue || faker.lorem.sentence(Math.floor(Math.random() * 10) + 1)
  )
  const [description, setDescription] = useState<string>()

  const { theme } = useContext(ThemeContext)
  const styles = getStyles({ theme })

  const TITLE_PLACEHOLDER = {
    default: {
      text: 'Enter your title here...',
      color: theme.darkGreyColor,
    },
    error: {
      text: 'Please enter a Title!',
      color: theme.errorColor,
    },
  }

  const [titlePlaceholderObj, setTitlePlaceholderObj] = useState<{
    text: string
    color: ColorValue
  }>(TITLE_PLACEHOLDER.default)

  const DESCRIPTION_PLACEHOLDER = 'Enter your description here...'

  useImperativeHandle(ref, () => ({
    isInputEmpty() {
      return title === '' ? true : false
    },
  }))

  const handleSubmitting = () => {
    // just create a new Todo if Title is provided
    if (!title) {
      setTitlePlaceholderObj(TITLE_PLACEHOLDER.error)
      return
    }
    submitFunction(title, activeCategory)
    setTitle('')
  }

  // TODO: Add Select for All Categories

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>{titleText || 'Add new Todo'}</Text>
        <View>
          <View style={{ marginBottom: 20, marginTop: 10 }}>
            <Text
              style={{
                color: theme.accentColor,
                fontWeight: '500',
                marginBottom: 4,
              }}
            >
              Title
            </Text>
            <TextInput
              value={title}
              onChangeText={(text) => {
                setTitle(text)
              }}
              style={styles.textInput}
              placeholder={titlePlaceholderObj.text}
              placeholderTextColor={titlePlaceholderObj.color}
              onSubmitEditing={() => handleSubmitting()}
              onFocus={() => setTitlePlaceholderObj(TITLE_PLACEHOLDER.default)}
              blurOnSubmit={false}
              autoFocus
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                color: theme.accentColor,
                fontWeight: '500',
                marginBottom: 4,
              }}
            >
              Description
            </Text>
            <TextInput
              value={description}
              onChangeText={(text) => {
                setDescription(text)
              }}
              style={[styles.textInput, { maxHeight: 72 }]}
              placeholder={DESCRIPTION_PLACEHOLDER}
              placeholderTextColor={theme.darkGreyColor}
              onSubmitEditing={() => handleSubmitting()}
              blurOnSubmit={false}
              multiline
              scrollEnabled
            />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            value={submitButtonText || 'Create'}
            rounded
            onPress={() => handleSubmitting()}
            style={{
              wrapper: [styles.touchableWrapper, { marginRight: 10 }],
              text: styles.buttonText,
            }}
          />
          <Button
            value={'Cancel'}
            variant={'error'}
            rounded
            onPress={() => cancelFunction()}
            style={{
              wrapper: [styles.touchableWrapper, { marginLeft: 10 }],
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
