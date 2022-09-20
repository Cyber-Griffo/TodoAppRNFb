import React, { useContext, useState } from 'react'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import { ColorValue, Linking, Text, TextInput, View } from 'react-native'
import Button from '../../button/Button'
import auth from '@react-native-firebase/auth'
import { HEADER_HEIGHT } from '../../../constants/StyleGuides'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CustomDrawerItemList from '../itemlist/CustomDrawerItemList'
import { getStyles } from './CustomDrawerContent.styles'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { addCategory } from '../../../database/FirebaseHandler'
import SectionHeader from '../sectionheader/CustomDrawerSectionHeader'
import { ThemeContext } from '../../../utils/ThemeContext'

type PlaceholderObj = {
  text: string
  color: ColorValue
}

export function CustomDrawerContent(props: DrawerContentComponentProps) {
  const insets = useSafeAreaInsets()
  const { theme } = useContext(ThemeContext)
  const styles = getStyles({ theme })

  const [categoryTitle, setCategoryTitle] = useState<string>('')
  const defautlPlaceholder: PlaceholderObj = {
    text: 'Add new...',
    color: theme.placeholderColor,
  }
  const errorPlaceholder: PlaceholderObj = {
    text: 'Enter a Title',
    color: theme.errorColor,
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
            color: theme.primaryColor,
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
                size={32}
                color={theme.accentColor}
              />
            }
            showIconLeft
          />
        </View>
      </View>
      <SectionHeader text="Categories" />
      <DrawerContentScrollView
        {...props}
        style={[styles.drawerContentScrollView, { marginTop: -insets.top }]}
      >
        <CustomDrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
        <SectionHeader text="Others" />
        <Button
          value={'Project Page'}
          variant="secondary"
          style={{
            container: {
              justifyContent: 'space-between',
              paddingHorizontal: 12,
            },
            text: {
              fontSize: 14,
              color: theme.darkColor,
            },
          }}
          onPress={() =>
            Linking.openURL('https://github.com/Cyber-Griffo/TodoAppRNFb')
          }
          iconRight={
            <View
              style={{
                width: 26,
                height: 26,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcon
                name="github"
                size={26}
                color={theme.accentColor}
              />
            </View>
          }
          showIconRight
          touchableProps={{ activeOpacity: 0.95 }}
        />
        <Button
          value={'Sign Out'}
          variant="secondary"
          rounded
          style={{
            wrapper: {
              marginBottom: insets.bottom === 0 ? 0 : insets.bottom,
            },
            container: {
              justifyContent: 'space-between',
              paddingLeft: 12,
              paddingRight: 10,
              paddingVertical: 10,
            },
            text: {
              fontSize: 14,
              color: theme.darkColor,
            },
          }}
          onPress={() => auth().signOut()}
          iconRight={
            <View
              style={{
                width: 26,
                height: 26,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialIcon
                name="logout"
                size={26}
                color={theme.accentColor}
              />
            </View>
          }
          showIconRight
        />
      </View>
    </View>
  )
}
