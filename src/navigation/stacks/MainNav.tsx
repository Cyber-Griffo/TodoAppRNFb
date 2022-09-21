import React, { useContext, useEffect, useRef, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import TodoScreen from '../../screens/todo/TodoScreen'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { todoSortingConditions } from '../../helper/TodoHelper'
import { StyleSheet, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import {
  firestoreCategoryPath,
  firestoreTodoPath,
} from '../../constants/Firebase'
import { CustomDrawerContent } from '../../components/customdrawer/content/CustomDrawerContent'
import { ThemeContext } from '../../utils/ThemeContext'
import { Category, CategoryCount, Todo } from '../../types/GeneralTypes'

const Drawer = createDrawerNavigator()

export function MainStack() {
  const uid = auth().currentUser?.uid
  const [todos, setTodos] = useState<Todo[]>([])
  const currTodos = useRef<Todo[]>(todos)
  const [categories, setCategories] = useState<Category[]>([])
  const currCategories = useRef<Category[]>(categories)
  const categoryCounts = useRef<CategoryCount[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(true)
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true)

  const { theme } = useContext(ThemeContext)

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
  function handleTodoModifiedChange(
    doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
    list: Todo[]
  ) {
    if (!list.find((todo) => todo.id === doc.id)) return list

    const { title, done, timestamp, categoryId } = doc.data() as Todo
    return list
      .map((todo) => {
        if (todo.id === doc.id) {
          return { id: doc.id, title, done, timestamp, categoryId }
        } else {
          return todo
        }
      })
      .sort((a, b) => {
        return todoSortingConditions(a, b)
      })
  }
  //#endregion

  //#region Category Handlers
  function handleCategoryRemovedChange(id: string, list: Category[]) {
    return list.filter((category) => id !== category.id)
  }
  function handleCategoryAddedChange(
    doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
    list: Category[]
  ) {
    if (categories.find((category) => doc.id === category.id)) return list
    return [...list, { id: doc.id, title: doc.data().title }]
  }
  function handleCategoryModifiedChange(
    doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
    list: Category[]
  ) {
    if (!categories.find((category) => doc.id === category.id)) return list
    return list
      .map((category) => {
        if (category.id === doc.id) {
          return {
            id: doc.id,
            title: doc.data().title,
          }
        }
        return category
      })
      .sort((a, b) => {
        return a.title.localeCompare(b.title)
      })
  }
  //#endregion

  //#region Helper Functions
  function sortTodosByDoneThenTimestamp(list: Todo[]) {
    return list.sort((a, b) => {
      return todoSortingConditions(a, b)
    })
  }
  function sortCategoriesByCaegoryString(list: Category[]) {
    return list.sort((a, b) => {
      return a.title.localeCompare(b.title)
    })
  }
  //#endregion

  useEffect(() => {
    if (!uid) return

    return firestoreTodoPath.onSnapshot((querySnapshot) => {
      let resortTodos = false
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
          resortTodos = true
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

      if (resortTodos) {
        currTodos.current = sortTodosByDoneThenTimestamp(currTodos.current)
      }
      setTodos(currTodos.current)

      if (isLoadingTodos) setIsLoadingTodos(false)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!uid) return

    return firestoreCategoryPath.onSnapshot((querySnapshot) => {
      let resortCategories = false
      querySnapshot.docChanges().forEach((docChange) => {
        if (docChange.type === 'removed') {
          // Category removed
          currCategories.current = handleCategoryRemovedChange(
            docChange.doc.id,
            currCategories.current
          )
        } else if (docChange.type === 'added') {
          // Category added
          currCategories.current = handleCategoryAddedChange(
            docChange.doc,
            currCategories.current
          )
          resortCategories = true
        } else if (docChange.type === 'modified') {
          // Category modified
          currCategories.current = handleCategoryModifiedChange(
            docChange.doc,
            currCategories.current
          )
        } else {
          console.error(
            'Unexpected Error accured while processing incoming Firebase Data: \n' +
              JSON.stringify(docChange.doc)
          )
        }
      })

      if (resortCategories) {
        currCategories.current = sortCategoriesByCaegoryString(
          currCategories.current
        )
      }
      setCategories(currCategories.current)

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
            todos={todos}
            key={'AllTodos#0'}
            categories={categories}
          />
        )}
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
                  todos={todos.filter(
                    (todo) => todo.categoryId === category.id
                  )}
                  activeCategory={category}
                  key={category.id}
                  categories={categories}
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
