import { StyleProp, TextStyle, ViewStyle } from 'react-native'

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
