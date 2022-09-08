import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import TodoScreen from './src/screens/todo/TodoScreen'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { LoginStack } from './src/navigation/LoginNav'
import Splash from './src/screens/splash/Splash'

const App = () => {
  // State for auth
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>()

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((userObj) => {
      setUser(userObj)
      if (initializing) setInitializing(false)
    })
    return subscriber // unsubscribe on unmount
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (initializing) return <Splash />

  //#region App
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
          translucent={true}
        />
        {user ? <TodoScreen /> : <LoginStack />}
      </SafeAreaProvider>
    </NavigationContainer>
  )
  //#endregion
}

export default App
