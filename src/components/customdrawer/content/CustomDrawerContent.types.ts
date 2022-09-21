import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { CategoryCount } from '../../../types/GeneralTypes'
import { Theme } from '../../../utils/ThemeContext'

export type CustomDrawerContentStylesContext = {
  theme: Theme
}

export type Props = {
  drawerProps: DrawerContentComponentProps
  categoryCounts: CategoryCount[]
}

export type CustomDrawerContentStyles = {
  wrapper: StyleProp<ViewStyle>
  headerWrapper: StyleProp<ViewStyle>
  headerContainerWrapper: StyleProp<ViewStyle>
  headerContainer: StyleProp<ViewStyle>
  headerHeading: StyleProp<TextStyle>
  headerTextInput: StyleProp<TextStyle>
  headerIconButtonContainer: StyleProp<ViewStyle>
  headerIconButtonWrapper: StyleProp<ViewStyle>
  headerIcon: StyleProp<TextStyle>
  drawerContentScrollView: StyleProp<ViewStyle>
  footerIconStyle: StyleProp<TextStyle>
  footerContainer: StyleProp<ViewStyle>
  footerButtonContainer: StyleProp<ViewStyle>
  footerButtonText: StyleProp<TextStyle>
}
