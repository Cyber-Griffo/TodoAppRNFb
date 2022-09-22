import React, { useContext, useEffect, useRef, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import TodoScreen from '../../screens/todo/TodoScreen'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { handleTodoModifiedChange } from '../../helper/TodoHelper'
import { StyleSheet, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import {
  firestoreCategoryPath,
  firestoreTodoPath,
} from '../../constants/Firebase'
import { CustomDrawerContent } from '../../components/customdrawer/content/CustomDrawerContent'
import { ThemeContext } from '../../utils/ThemeContext'
import { Category, CategoryCount, Todo } from '../../types/GeneralTypes'
import {
  handleCategoryAddedChange,
  handleCategoryModifiedChange,
  handleCategoryRemovedChange,
  sortCategoriesByCategoryString,
} from '../../helper/CategoryHelper'

const Drawer = createDrawerNavigator()

export function MainStack() {
  const uid = auth().currentUser?.uid
  const currTodos = useRef<Todo[]>([])
  const currCategories = useRef<Category[]>([])
  const categoryCounts = useRef<CategoryCount[]>([])
  const [_r, setRerender] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(true)
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true)

  const { theme } = useContext(ThemeContext)

  //TODO: setState(boolean) just rerender Component

  //#region Todo Handlers
  function handleTodoRemovedChange(
    id: string,
    list: Todo[],
    categoryId: string
  ): Todo[] {
    // Return if Todo isn't contained in List
    if (!list.find((todo) => todo.id === id)) return list

    // Update CategoryCountList
    if (categoryCounts.current) {
      let categoryCountExists = categoryCounts.current.find(
        (cc) => cc.categoryId === categoryId
      )
      if (categoryCountExists) {
        categoryCounts.current.map((categoryCount) => {
          if (categoryCount.categoryId === categoryId) {
            return {
              categoryId: categoryCount.categoryId,
              count: categoryCount.count--,
            }
          }
          return categoryCount
        })
      }
    }

    // Filter Todo List
    return list.filter((todo) => todo.id !== id)
  }

  function handleTodoAddedChange(
    doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
    list: Todo[]
  ): Todo[] {
    if (list.find((todo) => todo.id === doc.id)) return list

    const { title, done, timestamp, categoryId } = doc.data() as Todo

    // Update CategoryCountList
    if (categoryCounts.current) {
      let categoryCountExists = categoryCounts.current.find(
        (cc) => cc.categoryId === categoryId
      )
      if (categoryCountExists) {
        categoryCounts.current.map((categoryCount) => {
          if (categoryCount.categoryId === categoryId) {
            return {
              categoryId: categoryCount.categoryId,
              count: categoryCount.count++,
            }
          }
          return categoryCount
        })
      } else {
        categoryCounts.current = [
          ...categoryCounts.current,
          { categoryId: (doc.data() as Todo).categoryId, count: 1 },
        ]
      }
    }

    return [...list, { id: doc.id, title, done, timestamp, categoryId }]
  }

  //#endregion

  // Listen to changes on the FirestoreTodoPath
  useEffect(() => {
    if (!uid) return

    return firestoreTodoPath.onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((docChange) => {
        if (docChange.type === 'removed') {
          currTodos.current = handleTodoRemovedChange(
            docChange.doc.id,
            currTodos.current,
            (docChange.doc.data() as Todo).categoryId
          )
        } else if (docChange.type === 'added') {
          currTodos.current = handleTodoAddedChange(
            docChange.doc,
            currTodos.current
          )
        } else if (docChange.type === 'modified') {
          currTodos.current = handleTodoModifiedChange(
            docChange.doc,
            currTodos.current
          )
        } else {
          console.error(
            'Unexpected Error accured while processing incoming Firebase Data: \n' +
              JSON.stringify(docChange.doc)
          )
        }
      })

      setRerender((currRerender) => !currRerender)

      if (isLoadingTodos) setIsLoadingTodos(false)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Listen to changes on the FirestoreCategoryPath
  useEffect(() => {
    if (!uid) return

    return firestoreCategoryPath.onSnapshot((querySnapshot) => {
      let resortCategories = false
      querySnapshot.docChanges().forEach((docChange) => {
        if (docChange.type === 'removed') {
          currCategories.current = handleCategoryRemovedChange(
            docChange.doc.id,
            currCategories.current
          )
        } else if (docChange.type === 'added') {
          currCategories.current = handleCategoryAddedChange(
            docChange.doc,
            currCategories.current
          )
          resortCategories = true
        } else if (docChange.type === 'modified') {
          currCategories.current = handleCategoryModifiedChange(
            docChange.doc,
            currCategories.current
          )
          resortCategories = true
        } else {
          console.error(
            'Unexpected Error accured while processing incoming Firebase Data: \n' +
              JSON.stringify(docChange.doc)
          )
        }
      })

      if (resortCategories) {
        currCategories.current = sortCategoriesByCategoryString(
          currCategories.current
        )
        console.log(currCategories.current)
      }

      setRerender((currRerender) => !currRerender)

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
        drawerLabelStyle: { fontSize: 14 },
      }}
      drawerContent={(props) => {
        return (
          <CustomDrawerContent
            drawerProps={props}
            categoryCounts={categoryCounts.current}
          />
        )
      }}
    >
      <Drawer.Screen
        name=" "
        options={{ title: "All Todo's" }}
      >
        {() => (
          <TodoScreen
            todos={currTodos.current}
            key={'AllTodos#0'}
            categories={currCategories.current}
          />
        )}
      </Drawer.Screen>
      {currCategories.current.map((category) => {
        if (category.id && category.id !== '') {
          return (
            <Drawer.Screen
              name={category.id}
              key={category.id}
              options={{ title: category.title }}
            >
              {() => (
                <TodoScreen
                  todos={currTodos.current.filter(
                    (todo) => todo.categoryId === category.id
                  )}
                  activeCategory={category}
                  key={category.id}
                  categories={currCategories.current}
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
