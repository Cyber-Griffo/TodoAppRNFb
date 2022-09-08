import React from 'react'
import { Text, View } from 'react-native'
import Button from '../../components/button/Button'
import { getStyles } from './Login.styles'
import auth from '@react-native-firebase/auth'

const Login = () => {
  const styles = getStyles()

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button
        value={'login'}
        onPress={() => {
          auth().signInWithEmailAndPassword('test@test.test', '12345678')
        }}
      />
    </View>
  )
}

export default Login
