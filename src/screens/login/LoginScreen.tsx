import React from 'react'
import { Text, View } from 'react-native'
import Button from '../../components/button/Button'
import { getStyles } from './LoginScreen.styles'
import auth from '@react-native-firebase/auth'

const LoginTestAccountCredentials = {
  email: 'test@test.test',
  password: '12345678',
}

const Login = () => {
  const styles = getStyles()

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button
        value={'login'}
        onPress={() => {
          auth().signInWithEmailAndPassword(
            LoginTestAccountCredentials.email,
            LoginTestAccountCredentials.password
          )
        }}
      />
    </View>
  )
}

export default Login
