import React, { useContext } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
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
  } = props
  const styles = getStyles({
    theme,
    variant,
    rounded,
    borderRadius,
    iconButton,
  })

  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={[styles.buttonTouchable, props.style?.wrapper]}
      activeOpacity={0.9}
      {...props.touchableProps}
    >
      <View style={[styles.buttonView, props.style?.container]}>
        {showIconLeft && iconLeft}
        <Text style={[styles.text, props.style?.text]}>{props.value}</Text>
        {showIconRight && iconRight}
      </View>
    </TouchableHighlight>
  )
}

export default Button
