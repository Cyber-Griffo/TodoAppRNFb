import React, { useContext, useEffect, useRef, useState } from 'react'
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
  Category,
  CategoryCount,
  TodoFirebase,
  TodoLocal,
} from '../../types/GeneralTypes'
import {
  handleCategoryAddedChange,
  handleCategoryModifiedChange,
  handleCategoryRemovedChange,
  sortCategoriesByCategoryString,
} from '../../helper/CategoryHelper'
import { TESTING_ONLY_REMOVE_ALL_TODOS } from '../../database/FirebaseHandler'
import Button from '../../components/button/Button'

const Drawer = createDrawerNavigator()

export function MainStack() {
  const uid = auth().currentUser?.uid
  const currTodos = useRef<TodoLocal[]>([])
  const currCategories = useRef<Category[]>([])
  const categoryCounts = useRef<CategoryCount[]>([])
  const [_r, setRerender] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(true)
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true)

  const { theme } = useContext(ThemeContext)

  function updateCategoryCounts(categoryId: string, action: 'add' | 'remove') {
    if (categoryCounts.current) {
      let categoryCountExists = categoryCounts.current.find(
        (cc) => cc.categoryId === categoryId
      )
      if (categoryCountExists) {
        categoryCounts.current.map((categoryCount) => {
          if (categoryCount.categoryId === categoryId) {
            return {
              categoryId: categoryCount.categoryId,
              count:
                action === 'add'
                  ? categoryCount.count++
                  : categoryCount.count--,
            }
          }
          return categoryCount
        })
      } else {
        if (action === 'add') {
          categoryCounts.current = [
            ...categoryCounts.current,
            { categoryId, count: 1 },
          ]
        }
      }
    }
  }

  function addLocalTodo(newTodo: TodoLocal) {
    currTodos.current.push(newTodo)
  }

  function modifyLocalTodos(newTodo: TodoLocal) {
    currTodos.current = currTodos.current.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo
      }
      return todo
    })
  }

  function removeLocalTodo(removeTodo: TodoLocal) {
    currTodos.current = currTodos.current.filter(
      (todo) => todo.id !== removeTodo.id
    )
  }

  function handleTodoAddedChange(
    newTodo: TodoLocal,
    databaseTodo: boolean = false
  ): void {
    const refTodo = currTodos.current.find((todo) => todo.id === newTodo.id)
    if (refTodo) {
      if (
        !newTodo.lastChange ||
        (refTodo.lastChange ? newTodo.lastChange <= refTodo.lastChange : true)
      ) {
        return
      }
      modifyLocalTodos(newTodo)
    } else {
      addLocalTodo(newTodo)
      // Update CategoryCountList
      updateCategoryCounts(newTodo.categoryId, 'add')
    }

    // If locally added ToDo -> Rerender Page
    if (!databaseTodo) setRerender((currRerender) => !currRerender)
  }

  function handleTodoModifiedChange(
    modifiedTodo: TodoLocal,
    databaseTodo: boolean
  ): void {
    console.log('hallo')
    //handling Todos incoming from Database (Firebase)
    if (databaseTodo) {
      const refTodo = currTodos.current.find(
        (todo) => todo.id === modifiedTodo.id
      )

      if (
        !refTodo ||
        !modifiedTodo.lastChange ||
        (refTodo.lastChange && modifiedTodo.lastChange <= refTodo.lastChange)
      ) {
        return
      }
    }

    modifyLocalTodos(modifiedTodo)

    // If locally added ToDo -> Rerender Page
    if (!databaseTodo) setRerender((currRerender) => !currRerender)
  }

  function handleTodoRemovedChange(removedTodo: TodoLocal): void {
    if (!currTodos.current.find((todo) => todo.id === removedTodo.id)) return

    updateCategoryCounts(removedTodo.categoryId, 'remove')

    removeLocalTodo(removedTodo)
  }

  // Listen to changes on the FirestoreTodoPath
  useEffect(() => {
    if (!uid) return

    return firestoreTodoPath.onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((docChange) => {
        const firebaseTodo: TodoFirebase = docChange.doc.data() as TodoFirebase
        const localTodo: TodoLocal = {
          ...firebaseTodo,
          timestamp: firebaseTodo.timestamp?.toDate(),
          lastChange: firebaseTodo.lastChange?.toDate(),
        }
        if (docChange.type === 'added') {
          handleTodoAddedChange(localTodo, true)
        } else if (docChange.type === 'modified') {
          handleTodoModifiedChange(localTodo, true)
        } else if (docChange.type === 'removed') {
          handleTodoRemovedChange(localTodo)
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
        <Button
          value={'as'}
          onPress={() => {
            TESTING_ONLY_REMOVE_ALL_TODOS()
          }}
        />
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
