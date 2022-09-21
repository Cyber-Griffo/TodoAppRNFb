import React, { useContext } from 'react'
import { Pressable, Text, View } from 'react-native'
import { ThemeContext } from '../../../utils/ThemeContext'
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

  //TODO: Refactor Styles!

  return (
    <View style={{ width: '100%', paddingHorizontal: 12, marginVertical: 4 }}>
      <Pressable
        style={{ flex: 1 }}
        onPress={onPress}
      >
        {({ pressed }) => (
          <View
            style={[
              {
                width: '100%',
                position: 'relative',
                borderRadius: 12,
                overflow: 'hidden',
                backgroundColor: backgroundColor,
              },
              pressed && {
                backgroundColor: '#DBE7F0',
              },
            ]}
          >
            <View
              style={[
                {
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                },
                focused && { paddingLeft: 18 },
              ]}
            >
              {typeof label === 'string' ? (
                <Text
                  numberOfLines={1}
                  allowFontScaling={allowFontScaling}
                  style={[
                    {
                      color,
                    },
                    focused && {
                      fontWeight: '500',
                    },
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
                  {
                    fontSize: 12,
                    fontWeight: '500',
                    color: theme.accentGreyColor,
                  },
                  focused && { color: theme.accentColor, fontWeight: '600' },
                ]}
              >
                {categoryCount}
              </Text>
            </View>
            {focused && (
              <View
                style={{
                  height: '100%',
                  width: 6,
                  backgroundColor: theme.primaryColor,
                  position: 'absolute',
                }}
              />
            )}
          </View>
        )}
      </Pressable>
    </View>
  )
}

export default CustomDrawerItemListElemtent
