import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Theme } from '../../../utils/ThemeContext'

export type CustomDrawerContentStylesContext = {
  theme: Theme
}

export type Props = {
  drawerProps: DrawerContentComponentProps
}

export type CustomDrawerContentStyles = {
  wrapper: StyleProp<ViewStyle>
  headerWrapper: StyleProp<ViewStyle>
  headerContainerWrapper: StyleProp<ViewStyle>
  headerContainer: StyleProp<ViewStyle>
  headerHeading: StyleProp<TextStyle>
  headerTextInput: StyleProp<TextStyle>
  headerIconButtonWrapper: StyleProp<ViewStyle>
  headerIcon: StyleProp<TextStyle>
  drawerContentScrollView: StyleProp<ViewStyle>
  footerIconStyle: StyleProp<TextStyle>
  footerContainer: StyleProp<ViewStyle>
  footerButtonContainer: StyleProp<ViewStyle>
  footerButtonText: StyleProp<TextStyle>
}
