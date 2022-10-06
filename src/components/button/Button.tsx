import React, { useContext } from 'react'
import { ColorValue, Pressable, Text, View } from 'react-native'
import { ThemeContext } from '../../utils/ThemeContext'
import { getStyles } from './Button.styles'
import { Props as ButtonProps } from './Button.types'

const Button = (props: ButtonProps) => {
  const { theme } = useContext(ThemeContext)
  const {
    variant = 'primary',
    rounded = false,
    borderRadius = 10,
    iconButton = false,
    showIconLeft = false,
    showIconRight = false,
    iconLeft,
    iconRight,
    pressEffectColor = true,
    pressEffectSize = true,
    inverted = false,
  } = props

  const backgroundColor = getBackgroundColor()
  const textColor = getTextColor()
  const pressedColor = getPressedColor()

  const styles = getStyles({
    backgroundColor: inverted ? textColor : backgroundColor,
    textColor: inverted ? backgroundColor : textColor,
    theme,
    variant,
    rounded,
    borderRadius,
    iconButton,
  })

  function getPressedColor(): ColorValue {
    switch (variant) {
      case 'primary':
        return theme.primaryGreyColor
      case 'secondary':
        return theme.primaryLightColor
      case 'error':
        return theme.errorGreyColor
      default:
        return 'white'
    }
  }

  function getBackgroundColor(): ColorValue {
    switch (variant) {
      case 'primary':
        return theme.primaryColor
      case 'secondary':
        return theme.backgroundColor
      case 'error':
        return theme.errorColor
      default:
        return 'white'
    }
  }

  function getTextColor(): ColorValue {
    switch (variant) {
      case 'primary':
        return theme.backgroundColor
      case 'secondary':
        return theme.primaryColor
      case 'error':
        return theme.backgroundColor
      default:
        return 'white'
    }
  }

  return (
    <View style={[styles.buttonWrapper, props.style?.wrapper]}>
      <Pressable
        style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
        onPress={props.onPress}
        {...props.pressableProps}
      >
        {({ pressed }) => (
          <View
            style={[
              styles.buttonContainer,
              props.style?.container,
              pressed && pressEffectSize && { transform: [{ scale: 0.975 }] },
              pressed &&
                pressEffectColor &&
                !inverted && {
                  backgroundColor: pressedColor,
                },
            ]}
          >
            {showIconLeft && iconLeft}
            <Text
              style={[
                styles.text,
                props.style?.text,
                pressed &&
                  pressEffectColor &&
                  inverted && { color: pressedColor },
              ]}
            >
              {props.value}
            </Text>
            {showIconRight && iconRight}
          </View>
        )}
      </Pressable>
    </View>
  )
}

export default Button
