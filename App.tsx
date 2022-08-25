import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TodoScreen from './screens/todo/TodoScreen';


const App = () => {
  //#region App
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent={true} />
      <TodoScreen />
    </SafeAreaProvider>
  )
  //#endregion
}

export default App
