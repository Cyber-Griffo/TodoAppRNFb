import React, { useContext, useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import TodoScreen from '../../screens/todo/TodoScreen'
import { StyleSheet, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import {
  firestoreCategoryPath,
  firestoreTodoPath,
} from '../../constants/Firebase'
import { CustomDrawerContent } from '../../components/customdrawer/content/CustomDrawerContent'
import { ThemeContext } from '../../utils/ThemeContext'
import {
  CategoryFirebase,
  CategoryLocal,
  TodoFirebase,
  TodoLocal,
} from '../../types/GeneralTypes'
import { useTodoStore } from '../../zustand/TodoStore'

const Drawer = createDrawerNavigator()

export function MainStack() {
  const uid = auth().currentUser?.uid
  const addTodo = useTodoStore((state) => state.addTodo)
  const modifyTodo = useTodoStore((state) => state.modifyTodo)
  const removeTodo = useTodoStore((state) => state.removeTodo)
  const categories = useTodoStore((state) => state.categories)
  const addCategory = useTodoStore((state) => state.addCategory)
  const modifyCategory = useTodoStore((state) => state.modifyCategory)
  const removeCategory = useTodoStore((state) => state.removeCategory)

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(true)
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true)

  const { theme } = useContext(ThemeContext)

  // Listen to changes on the FirestoreTodoPath
  useEffect(() => {
    if (!uid) return

    return firestoreTodoPath.onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((docChange) => {
        const firebaseTodo: TodoFirebase = docChange.doc.data() as TodoFirebase
        const localTodo: TodoLocal = {
          ...firebaseTodo,
          timestamp: firebaseTodo.timestamp?.toDate() || new Date(Date.now()),
          lastChange: firebaseTodo.lastChange?.toDate() || new Date(Date.now()),
        }
        if (docChange.type === 'added') {
          addTodo(localTodo)
        } else if (docChange.type === 'modified') {
          modifyTodo(localTodo)
        } else if (docChange.type === 'removed') {
          removeTodo(localTodo)
        } else {
          console.error(
            'Unexpected Error accured while processing incoming Firebase Data: \n' +
              JSON.stringify(docChange.doc)
          )
        }
      })

      if (isLoadingTodos) setIsLoadingTodos(false)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Listen to changes on the FirestoreCategoryPath
  useEffect(() => {
    if (!uid) return

    return firestoreCategoryPath.onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((docChange) => {
        const firebaseCategory: CategoryFirebase =
          docChange.doc.data() as CategoryFirebase
        const localCategory: CategoryLocal = {
          ...firebaseCategory,
          lastChange: firebaseCategory.lastChange?.toDate(),
        }
        if (docChange.type === 'added') {
          addCategory(localCategory)
        } else if (docChange.type === 'modified') {
          modifyCategory(localCategory)
        } else if (docChange.type === 'removed') {
          removeCategory(localCategory)
        } else {
          console.error(
            'Unexpected Error accured while processing incoming Firebase Data: \n' +
              JSON.stringify(docChange.doc)
          )
        }
      })

      if (isLoadingCategories) setIsLoadingCategories(false)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isLoadingCategories && !isLoadingTodos) setIsLoading(false)
  }, [isLoadingCategories, isLoadingTodos])

  if (isLoading) {
    return (
      <View style={styles.loadginScreenContainer}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: theme.primaryColor as string,
        drawerActiveBackgroundColor: theme.primaryLightColor as string,
        drawerInactiveBackgroundColor: theme.backgroundColor as string,
        drawerInactiveTintColor: theme.darkColor as string,
        drawerItemStyle: { borderRadius: 12 },
        drawerLabelStyle: { fontSize: 16 },
      }}
      drawerContent={(props) => {
        return <CustomDrawerContent drawerProps={props} />
      }}
    >
      <Drawer.Screen
        name=" "
        options={{ title: "All Todo's" }}
      >
        {() => <TodoScreen key={'AllTodos#0'} />}
      </Drawer.Screen>
      {categories.map((category) => {
        if (category.id && category.id !== '') {
          return (
            <Drawer.Screen
              name={category.id}
              key={category.id}
              options={{ title: category.title }}
            >
              {() => (
                <TodoScreen
                  key={category.id}
                  activeCategory={category}
                />
              )}
            </Drawer.Screen>
          )
        }
      })}
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  loadginScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
