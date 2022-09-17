import React from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../../components/button/Button'
import WelcomeIllustration from '../../svg/welcomeIllustration/WelcomeIllustration'
import { getStyles } from './WelcomeScreen.styles'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const WelcomeScreen = ({ navigation }) => {
  const styles = getStyles()
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={[styles.headerText, { marginTop: insets.top + 75 }]}>
          Blutudo
        </Text>
        <WelcomeIllustration
          color={'#278bce'}
          style={styles.illustration}
        />
      </View>
      <View style={styles.bottomContainerWrapper}>
        <View style={styles.bottomContainer}>
          <View style={{}}>
            <Text style={styles.bottomHeaderText}>
              Your App all around Todo's
            </Text>
            <Text style={styles.bottomSubHeaderText}>
              Manage your Taks to the next level
            </Text>
          </View>
          <Button
            value={'Get Started'}
            variant={'secondary'}
            rounded
            style={{
              wrapper: styles.buttonWrapper,
              container: styles.buttonContainer,
            }}
            onPress={() => navigation.navigate('Login')}
            iconRight={
              <MaterialIcon
                name="arrow-forward-ios"
                size={16}
                color={'#278BCE'}
              />
            }
            showIconRight
          />
        </View>
      </View>
    </View>
  )
}

export default WelcomeScreen
