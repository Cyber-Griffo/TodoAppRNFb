import React, { useEffect, useRef, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import TodoScreen from '../screens/todo/TodoScreen'
import { Todo } from '../screens/todo/TodoScreen.types'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { todoSortingConditions } from '../helper/TodoHelper'
import { Text, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import { firestoreCategoryPath, firestoreTodoPath } from '../constants/Firebase'

const Stack = createDrawerNavigator()

type Category = {
  title: string
  id: string
}

export function MainStack() {
  const uid = auth().currentUser?.uid
  const [todos, setTodos] = useState<Todo[]>([])
  const currTodos = useRef<Todo[]>(todos)
  const [categories, setCategories] = useState<Category[]>([])
  const currCategories = useRef<Category[]>(categories)

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(true)
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true)

  //#region Todo Handlers
  function handleTodoRemovedChange(id: string, list: Todo[]) {
    return list.filter((todo) => todo.id !== id)
  }
  function handleTodoAddedChange(
    doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
    list: Todo[]
  ) {
    if (list.find((todo) => todo.id === doc.id)) return list

    const { title, done, timestamp, category } = doc.data() as Todo
    return [...list, { id: doc.id, title, done, timestamp, category }]
  }
  function handleTodoModifiedChange(
    doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
    list: Todo[]
  ) {
    if (!list.find((todo) => todo.id === doc.id)) return list

    const { title, done, timestamp, category } = doc.data() as Todo
    return list
      .map((todo) => {
        if (todo.id === doc.id) {
          return { id: doc.id, title, done, timestamp, category }
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
          return { id: doc.id, title: doc.data().title as string }
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

  // TODO: Change Adding, Modifiing and Deleting Operation to temporary use a helper Datastructure and set the State once after each docChange Event (Helps to increase Performance)

  useEffect(() => {
    if (!uid) return

    return firestoreTodoPath.onSnapshot((querySnapshot) => {
      let resortTodos = false
      querySnapshot.docChanges().forEach((docChange) => {
        if (docChange.type === 'removed') {
          currTodos.current = handleTodoRemovedChange(
            docChange.doc.id,
            currTodos.current
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

  // TODO: Change Adding, Modifiing and Deleting Operation to temporary use a helper Datastructure and set the State once after each docChange Event (Helps to increase Performance)

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
    if (!(isLoadingCategories && isLoadingTodos)) setIsLoading(false)
  }, [isLoadingCategories, isLoadingTodos])

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Todos">
        {() => (
          <TodoScreen
            todos={todos}
            key={'AllTodos#0'}
          />
        )}
      </Stack.Screen>
      {categories.map((category) => {
        if (category.title !== '') {
          return (
            <Stack.Screen
              name={category.title}
              key={category.id}
            >
              {() => (
                <TodoScreen
                  todos={todos.filter(
                    (todo) => todo.category === category.title
                  )}
                  category={category.title}
                  key={category.id}
                />
              )}
            </Stack.Screen>
          )
        }
      })}
    </Stack.Navigator>
  )
}
