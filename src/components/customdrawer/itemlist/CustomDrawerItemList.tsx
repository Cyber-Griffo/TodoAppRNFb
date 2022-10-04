import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from '@react-navigation/drawer/lib/typescript/src/types'
import {
  CommonActions,
  DrawerActions,
  DrawerNavigationState,
  ParamListBase,
} from '@react-navigation/native'
import * as React from 'react'
import { useTodoStore } from '../../../zustand/TodoStore'
import CustomDrawerItemListElemtent from '../itemlistelement/CustomDrawerItemListElemtent'

type Props = {
  state: DrawerNavigationState<ParamListBase>
  navigation: DrawerNavigationHelpers
  descriptors: DrawerDescriptorMap
}

/**
 * Component that renders the navigation list in the drawer.
 */
export default function CustomDrawerItemList({
  state,
  navigation,
  descriptors,
}: Props) {
  const focusedRoute = state.routes[state.index]
  const focusedDescriptor = descriptors[focusedRoute.key]
  const focusedOptions = focusedDescriptor.options

  const {
    drawerActiveTintColor,
    drawerInactiveTintColor,
    drawerActiveBackgroundColor,
    drawerInactiveBackgroundColor,
  } = focusedOptions

  const categoryCounts = useTodoStore(
    (todoStoreState) => todoStoreState.categoryCounts
  )

  return state.routes.map((route, i) => {
    const focused = i === state.index

    // If All Todo's === ' ' -> Sum up all CategoryCounts, else take the Count of the Correct Category -> default to 0
    let categoryCount: number =
      route.name === ' '
        ? categoryCounts.reduce((prev, curr) => {
            return prev + curr.count
          }, 0)
        : categoryCounts.find((cc) => cc.categoryId === route.name)?.count || 0

    const onPress = () => {
      const event = navigation.emit({
        type: 'drawerItemPress',
        target: route.key,
        canPreventDefault: true,
      })

      if (!event.defaultPrevented) {
        navigation.dispatch({
          ...(focused
            ? DrawerActions.closeDrawer()
            : CommonActions.navigate({ name: route.name, merge: true })),
          target: state.key,
        })
      }
    }

    const {
      title,
      drawerLabel,
      drawerIcon,
      drawerLabelStyle,
      drawerItemStyle,
      drawerAllowFontScaling,
    } = descriptors[route.key].options

    return (
      <CustomDrawerItemListElemtent
        key={route.key}
        label={
          drawerLabel !== undefined
            ? drawerLabel
            : title !== undefined
            ? title
            : route.name
        }
        icon={drawerIcon}
        focused={focused}
        activeTintColor={drawerActiveTintColor}
        inactiveTintColor={drawerInactiveTintColor}
        activeBackgroundColor={drawerActiveBackgroundColor}
        inactiveBackgroundColor={drawerInactiveBackgroundColor}
        allowFontScaling={drawerAllowFontScaling}
        labelStyle={drawerLabelStyle}
        style={drawerItemStyle}
        onPress={onPress}
        index={i}
        categoryCount={categoryCount}
      />
    )
  }) as React.ReactNode as React.ReactElement
}
