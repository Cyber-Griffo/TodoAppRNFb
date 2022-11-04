import React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { CategoryLocal } from '../../types/GeneralTypes'
import { Theme } from '../../utils/ThemeContext'

export type TodoScreenProps = {
  activeCategory?: CategoryLocal
  iconRight?: React.ReactNode
}

export type TodoScreenStyleContext = {
  theme: Theme
}

export type TodoScreenStyles = {
  wrapperContainer: StyleProp<ViewStyle>
  headerWrapper: StyleProp<ViewStyle>
  headerContainer: StyleProp<ViewStyle>
  headerTextWrapper: StyleProp<ViewStyle>
  headerText: StyleProp<TextStyle>
  headerPlaceholderRight: StyleProp<ViewStyle>
  footerButton: StyleProp<ViewStyle>
  footerText: StyleProp<TextStyle>
  loadingScreenContainer: StyleProp<ViewStyle>
  loadingScreenText: StyleProp<TextStyle>
  todoEditModalContainer: StyleProp<ViewStyle>
  safeAreaBottomContainer: StyleProp<ViewStyle>
}
