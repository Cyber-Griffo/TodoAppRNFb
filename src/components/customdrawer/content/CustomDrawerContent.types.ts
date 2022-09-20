import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { CategoryCount } from '../../../navigation/stacks/MainNav'
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
  headerTextInput: StyleProp<TextStyle>
  headerIconButtonContainer: StyleProp<ViewStyle>
  headerIconButtonWrapper: StyleProp<ViewStyle>
  drawerContentScrollView: StyleProp<ViewStyle>
  iconStyle: StyleProp<TextStyle>
}
