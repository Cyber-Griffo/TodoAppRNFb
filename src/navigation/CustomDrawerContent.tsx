import React from 'react'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { Text, View } from 'react-native'
import Button from '../components/button/Button'
import auth from '@react-native-firebase/auth'
import { HEADER_HEIGHT } from '../constants/StyleGuides'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const insets = useSafeAreaInsets()
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          height: HEADER_HEIGHT + insets.top,
          backgroundColor: '#278BCE',

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Button
            value={'Add New Category'}
            style={{
              text: {
                fontWeight: '500',
              },
            }}
            onPress={() => console.log('create new Category')}
            touchableProps={{ activeOpacity: 1 }}
          />
        </View>
      </View>
      <DrawerContentScrollView
        {...props}
        style={{ marginTop: -insets.top + 5, zIndex: -1 }}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View>
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'darkgrey',
          }}
        />
        <Button
          value={'Project Page'}
          rounded
          variant="secondary"
          style={{
            wrapper: { marginHorizontal: 10, marginTop: 10 },
            container: { justifyContent: 'flex-start' },
            text: {
              fontWeight: '500',
              fontSize: 16,
              color: 'black',
            },
          }}
          onPress={() => auth().signOut()}
        >
          <Text style={{ marginHorizontal: 10, color: '#278BCE' }}>Icon</Text>
        </Button>
        <Button
          value={'Sign Out'}
          rounded
          variant="secondary"
          style={{
            wrapper: {
              marginHorizontal: 10,
              marginTop: 10,
              marginBottom: insets.bottom === 0 ? 10 : insets.bottom,
            },
            container: { justifyContent: 'flex-start' },
            text: {
              fontWeight: '500',
              fontSize: 16,
              color: 'black',
            },
          }}
          onPress={() => auth().signOut()}
        >
          <Text style={{ marginHorizontal: 10, color: '#278BCE' }}>Icon</Text>
        </Button>
      </View>
    </View>
  )
}
