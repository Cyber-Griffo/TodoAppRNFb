import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export type Props = {
  navigation: NavigationProp<ParamListBase>
}

export type WelcomeScreenStyles = {
  container: StyleProp<ViewStyle>
  topContainer: StyleProp<ViewStyle>
  illustration: StyleProp<TextStyle>
  bottomContainerWrapper: StyleProp<ViewStyle>
  bottomContainer: StyleProp<ViewStyle>
  headerText: StyleProp<TextStyle>
  bottomHeaderText: StyleProp<TextStyle>
  bottomSubHeaderText: StyleProp<TextStyle>
  buttonWrapper: StyleProp<ViewStyle>
  buttonContainer: StyleProp<ViewStyle>
}
