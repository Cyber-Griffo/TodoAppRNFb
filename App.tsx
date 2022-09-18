import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { LoginStack } from './src/navigation/stacks/LoginNav'
import Splash from './src/screens/splash/SplashScreen'
import { MainStack } from './src/navigation/stacks/MainNav'
import ThemeContextProvider from './src/utils/ThemeContext'

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
    <ThemeContextProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={'transparent'}
            translucent={true}
          />
          {user ? <MainStack /> : <LoginStack />}
        </SafeAreaProvider>
      </NavigationContainer>
    </ThemeContextProvider>
  )
  //#endregion
}

export default App
