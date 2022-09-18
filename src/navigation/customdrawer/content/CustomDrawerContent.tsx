import React, { useState } from 'react'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import { Linking, Text, TextInput, View } from 'react-native'
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
    text: 'Add new...',
    color: '#A3B0B8',
  }
  const errorPlaceholder: PlaceholderObj = {
    text: 'Enter a Title',
    color: '#FB7185',
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
        style={[
          styles.headerWrapper,
          { height: HEADER_HEIGHT * 2 + insets.top },
        ]}
      >
        <Text
          style={{
            marginLeft: 12,
            fontSize: 24,
            color: '#0B2638',
            paddingRight: 12,
            fontWeight: '500',
          }}
        >
          Your Categories
        </Text>
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
            iconLeft={
              <MaterialIcon
                name="add"
                size={24}
                color={'#0B2638'}
              />
            }
            showIconLeft
          />
        </View>
        <View style={styles.breaker} />
      </View>
      <View style={{ backgroundColor: 'white', paddingVertical: 8 }}>
        <Text style={{ marginLeft: 12, color: '#A3B0B8' }}>Categories</Text>
      </View>
      <DrawerContentScrollView
        {...props}
        style={[styles.drawerContentScrollView, { marginTop: -insets.top }]}
      >
        <CustomDrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{}}>
        <View style={styles.breaker} />
        <View style={{ backgroundColor: 'white', paddingTop: 10 }}>
          <Text style={{ marginLeft: 12, color: '#A3B0B8' }}>Other</Text>
        </View>
        <Button
          value={'Project Page'}
          variant="secondary"
          style={{
            container: {
              justifyContent: 'space-between',
              paddingLeft: 16,
              paddingRight: 22,
            },
            text: {
              fontWeight: '500',
              fontSize: 14,
              color: '#0B2638',
            },
          }}
          onPress={() =>
            Linking.openURL('https://github.com/Cyber-Griffo/TodoAppRNFb')
          }
          iconRight={
            <View
              style={{
                width: 22,
                height: 22,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcon
                name="github"
                size={22}
                color={'#0B2638'}
              />
            </View>
          }
          showIconRight
          touchableProps={{ activeOpacity: 0.95 }}
        />
        <Button
          value={'Sign Out'}
          variant="secondary"
          style={{
            wrapper: {
              marginBottom: insets.bottom === 0 ? 6 : insets.bottom,
            },
            container: {
              justifyContent: 'space-between',
              paddingLeft: 16,
              paddingRight: 20,
            },
            text: {
              fontWeight: '500',
              fontSize: 14,
              color: '#0B2638',
            },
          }}
          onPress={() => auth().signOut()}
          iconRight={
            <View
              style={{
                width: 22,
                height: 22,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialIcon
                name="logout"
                size={22}
                color={'#0B2638'}
              />
            </View>
          }
          showIconRight
          touchableProps={{ activeOpacity: 0.95 }}
        />
      </View>
    </View>
  )
}
