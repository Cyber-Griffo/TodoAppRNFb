import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../../screens/login/LoginScreen'
import RegisterScreen from '../../screens/register/RegisterScreen'
import WelcomeScreen from '../../screens/welcome/WelcomeScreen'

const Stack = createNativeStackNavigator()

export function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'Welcome'}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />
    </Stack.Navigator>
  )
}
