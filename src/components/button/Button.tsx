import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { getStyles } from './Button.styles'
import { Props as ButtonProps } from './Button.types'

const Button = (props: ButtonProps) => {
  const {
    variant = 'primary',
    rounded = false,
    borderRadius = 10,
    children,
  } = props
  const styles = getStyles({ variant, rounded, borderRadius })

  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={[styles.buttonTouchable, props.style?.wrapper]}
      activeOpacity={0.9}
      {...props.touchableProps}
    >
      <View style={[styles.buttonView, props.style?.container]}>
        {children}
        <Text style={[styles.text, props.style?.text]}>{props.value}</Text>
      </View>
    </TouchableHighlight>
  )
}

export default Button
