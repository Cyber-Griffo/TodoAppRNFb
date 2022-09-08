import React from 'react'
import { Text, View } from 'react-native'
import { getStyles } from './Splash.styles'

const Splash = () => {
  const styles = getStyles()

  return (
    <View style={styles.container}>
      <Text>Splash</Text>
    </View>
  )
}

export default Splash
