import React, { useContext } from 'react'
import { Pressable, Text, View } from 'react-native'
import { ThemeContext } from '../../../utils/ThemeContext'
import { getStyles } from './CustomDrawerItemListElemtent.styles'
import { Props as CustomDrawerItemListElemtentProps } from './CustomDrawerItemListElemtent.types'

const CustomDrawerItemListElemtent = (
  props: CustomDrawerItemListElemtentProps
) => {
  const { theme } = useContext(ThemeContext)
  const {
    label,
    onPress,
    activeBackgroundColor = theme.primaryLightColor,
    activeTintColor = theme.primaryColor,
    allowFontScaling,
    focused = false,
    inactiveBackgroundColor = theme.backgroundColor,
    inactiveTintColor = theme.darkColor,
    labelStyle,
    categoryCount,
  } = props
  const color = focused ? activeTintColor : inactiveTintColor
  const backgroundColor = focused
    ? activeBackgroundColor
    : inactiveBackgroundColor

  const styles = getStyles({ theme })

  //TODO: Refactor Styles!

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.pressable}
        onPress={onPress}
      >
        {({ pressed }) => (
          <View
            style={[
              styles.containerWrapper,
              { backgroundColor },
              pressed && styles.containerWrapperPressed,
            ]}
          >
            <View
              style={[styles.container, focused && styles.containerFocused]}
            >
              {typeof label === 'string' ? (
                <Text
                  numberOfLines={1}
                  allowFontScaling={allowFontScaling}
                  style={[
                    {
                      color,
                    },
                    focused && styles.textFocused,
                    labelStyle,
                  ]}
                >
                  {label}
                </Text>
              ) : (
                label({ color: color.toString(), focused })
              )}
              <Text
                style={[
                  styles.categoryCountText,
                  focused && styles.categoryCountTextFocused,
                ]}
              >
                {categoryCount}
              </Text>
            </View>
            {focused && <View style={styles.focusedMarker} />}
          </View>
        )}
      </Pressable>
    </View>
  )
}

export default CustomDrawerItemListElemtent
