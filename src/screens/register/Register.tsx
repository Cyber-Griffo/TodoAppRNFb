import React from 'react'
import { Text, View } from 'react-native'
import { getStyles } from './Register.styles'

const Register = () => {
  const styles = getStyles()

  return (
    <View style={styles.container}>
      <Text>Register</Text>
    </View>
  )
}

export default Register
