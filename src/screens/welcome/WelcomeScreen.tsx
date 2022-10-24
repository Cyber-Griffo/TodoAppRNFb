import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../../components/button/Button'
import WelcomeIllustration from '../../svg/welcomeIllustration/WelcomeIllustration'
import { getStyles } from './WelcomeScreen.styles'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Props as WelcomScreenProps } from './WelcomeScreen.types'
import { ThemeContext } from '../../utils/ThemeContext'

const WelcomeScreen = ({ navigation }: WelcomScreenProps) => {
  const { theme } = useContext(ThemeContext)
  const styles = getStyles({ theme })
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={[styles.headerText, { marginTop: insets.top + 75 }]}>
          Blutudo
        </Text>
        <WelcomeIllustration
          color={{
            accent: theme.accentColor,
            dark: theme.darkColor,
            grey: theme.darkGreyColor,
            primary: theme.primaryColor,
            white: theme.backgroundColor,
          }}
          svgProps={{
            style: styles.illustration,
          }}
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
              container: styles.buttonContainer,
            }}
            onPress={() => navigation.navigate('Login')}
            iconRight={
              <MaterialIcon
                name="arrow-forward-ios"
                size={16}
                color={theme.primaryColor}
              />
            }
            showIconRight
          />
          {/* <Pressable
            style={{
              width: '40%',
              height: 48,
              overflow: 'hidden',
              borderRadius: 10,
            }}
          >
            {({ pressed }) => (
              <View
                style={{
                  width: '100%',
                  height: '100%',

                  backgroundColor: 'white',
                }}
              >
                <Text>Hallo</Text>
              </View>
            )}
          </Pressable> */}
        </View>
      </View>
    </View>
  )
}

export default WelcomeScreen
