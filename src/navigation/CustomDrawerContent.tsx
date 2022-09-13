import React from 'react'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { View } from 'react-native'
import Button from '../components/button/Button'
import auth from '@react-native-firebase/auth'

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View>
        <Button
          value={'log out'}
          onPress={() => auth().signOut()}
        />
      </View>
    </View>
  )
}
