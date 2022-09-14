import React from 'react'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import { Linking, View } from 'react-native'
import Button from '../../../components/button/Button'
import auth from '@react-native-firebase/auth'
import { HEADER_HEIGHT } from '../../../constants/StyleGuides'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CustomDrawerItemList from '../itemlist/CustomDrawerItemList'
import { getStyles } from './CustomDrawerContent.styles'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const insets = useSafeAreaInsets()
  const styles = getStyles()

  return (
    <View style={styles.wrapper}>
      <View
        style={[styles.headerWrapper, { height: HEADER_HEIGHT + insets.top }]}
      >
        <View style={styles.headerContainer}>
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
        style={[styles.drawerContentScrollView, { marginTop: -insets.top + 5 }]}
      >
        <CustomDrawerItemList {...props} />
      </DrawerContentScrollView>
      <View>
        <View style={styles.breaker} />
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
          onPress={() =>
            Linking.openURL('https://github.com/Cyber-Griffo/TodoAppRNFb')
          }
        >
          <MaterialCommunityIcon
            name="github"
            size={22}
            style={styles.iconStyle}
            color={'#278BCE'}
          />
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
          <MaterialIcon
            name="logout"
            size={18}
            style={[styles.iconStyle, { marginLeft: 2 }]}
            color={'#278BCE'}
          />
        </Button>
      </View>
    </View>
  )
}
