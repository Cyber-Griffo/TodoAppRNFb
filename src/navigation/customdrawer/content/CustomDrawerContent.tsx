import React, { useState } from 'react'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import { Linking, TextInput, View } from 'react-native'
import Button from '../../../components/button/Button'
import auth from '@react-native-firebase/auth'
import { HEADER_HEIGHT } from '../../../constants/StyleGuides'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CustomDrawerItemList from '../itemlist/CustomDrawerItemList'
import { getStyles } from './CustomDrawerContent.styles'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { addCategory } from '../../../database/FirebaseHandler'

type PlaceholderObj = {
  text: string
  color: string
}

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const insets = useSafeAreaInsets()
  const styles = getStyles()

  const [categoryTitle, setCategoryTitle] = useState<string>('')
  const defautlPlaceholder: PlaceholderObj = {
    text: 'Create New Category',
    color: 'darkgrey',
  }
  const errorPlaceholder: PlaceholderObj = {
    text: 'Enter a Title',
    color: 'red',
  }
  const [placeholderObj, setPlaceholderObj] =
    useState<PlaceholderObj>(defautlPlaceholder)

  function handleSubmitting() {
    if (categoryTitle === '') {
      setPlaceholderObj(errorPlaceholder)
      return
    }
    addCategory(categoryTitle)
    setCategoryTitle('')
  }

  return (
    <View style={styles.wrapper}>
      <View
        style={[styles.headerWrapper, { height: HEADER_HEIGHT + insets.top }]}
      >
        <View style={styles.headerContainer}>
          <TextInput
            style={styles.headerTextInput}
            placeholder={placeholderObj.text}
            placeholderTextColor={placeholderObj.color}
            value={categoryTitle}
            onFocus={() => setPlaceholderObj(defautlPlaceholder)}
            onChangeText={(text) => setCategoryTitle(text)}
            onSubmitEditing={() => handleSubmitting()}
          />
          <Button
            value={''}
            variant="secondary"
            style={{
              container: styles.headerIconButtonContainer,
              wrapper: styles.headerIconButtonWrapper,
            }}
            rounded
            onPress={() => handleSubmitting()}
            iconButton
          >
            <MaterialIcon
              name="add"
              size={20}
              color={'#278BCE'}
            />
          </Button>
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
          iconLeft={
            <MaterialCommunityIcon
              name="github"
              size={22}
              style={styles.iconStyle}
              color={'#278BCE'}
            />
          }
          showIconLeft
        />
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
          iconLeft={
            <MaterialIcon
              name="logout"
              size={18}
              style={[styles.iconStyle, { marginLeft: 2 }]}
              color={'#278BCE'}
            />
          }
          showIconLeft
        />
      </View>
    </View>
  )
}
