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
  category: string
  id: string
}

// TODO: Screen Template to render Categories

export function MainStack() {
  const uid = auth().currentUser?.uid
  const [todos, setTodos] = useState<Todo[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  console.log(categories)

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(true)
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true)
  const isAddedChangeTodo = useRef<boolean>(false)
  const isAddedChangeCategory = useRef<boolean>(false)

  //! Just for testing purposes
  /*   function removeAllTestTodo() {
    todos?.forEach((todo) => {
      if (todo.title === 'Test') {
        removeTodo(todo.id)
      }
    })
  } */

  //#region Todo Handlers
  function handleTodoRemovedChange(id: string) {
    setTodos((currTodos) => {
      return currTodos?.filter((todo) => todo.id !== id)
    })
  }
  function handleTodoAddedChange(
    doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
  ) {
    if (todos.find((todo) => todo.id === doc.id)) return

    const { title, done, timestamp } = doc.data() as Todo
    setTodos((currTodos) => {
      return [
        ...currTodos,
        { id: doc.id, title, done, timestamp, category: '' },
      ]
    })
  }
  function handleTodoModifiedChange(
    doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
  ) {
    const { title, done, timestamp } = doc.data() as Todo
    setTodos((currTodos) => {
      return currTodos
        .map((todo) => {
          if (todo.id === doc.id) {
            return { id: doc.id, title, done, timestamp, category: '' }
          } else {
            return todo
          }
        })
        .sort((a, b) => {
          return todoSortingConditions(a, b)
        })
    })
  }
  //#endregion

  //#region Category Handlers
  function handleCategoryRemovedChange(id: string) {
    if (!categories.find((category) => id === category.id)) return
    setCategories((currCategories) => {
      return currCategories.filter((category) => id !== category.id)
    })
  }
  function handleCategoryAddedChange(
    doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
  ) {
    if (categories.find((category) => doc.id === category.id)) return
    setCategories((currCategories) => {
      return [...currCategories, { id: doc.id, category: doc.data().category }]
    })
  }
  function handleCategoryModifiedChange(
    doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
  ) {
    if (!categories.find((category) => doc.id === category.id)) return
    setCategories((currCategories) => {
      return currCategories
        .map((category) => {
          if (category.id === doc.id) {
            return { id: doc.id, category: doc.data().category as string }
          }
          return category
        })
        .sort((a, b) => {
          return b.category.localeCompare(a.category)
        })
    })
  }
  //#endregion

  //#region Helper Functions
  function sortTodosByDoneThenTimestamp() {
    setTodos((currTodos) => {
      return currTodos.sort((a, b) => {
        return todoSortingConditions(a, b)
      })
    })
  }
  function sortCategoriesByCaegoryString() {
    setCategories((currCategories) => {
      return currCategories.sort((a, b) => {
        return b.category.localeCompare(a.category)
      })
    })
  }
  //#endregion

  // TODO: Change Adding, Modifiing and Deleting Operation to temporary use a helper Datastructure and set the State once after each docChange Event (Helps to increase Performance)

  useEffect(() => {
    if (!uid) return

    return firestoreTodoPath.onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((docChange) => {
        if (docChange.type === 'removed') {
          handleTodoRemovedChange(docChange.doc.id)
        } else if (docChange.type === 'added') {
          handleTodoAddedChange(docChange.doc)
          isAddedChangeCategory.current = true
        } else if (docChange.type === 'modified') {
          handleTodoModifiedChange(docChange.doc)
        } else {
          console.error(
            'Unexpected Error accured while processing incoming Firebase Data: \n' +
              JSON.stringify(docChange.doc)
          )
        }
      })

      if (isAddedChangeTodo.current) {
        sortTodosByDoneThenTimestamp()
        isAddedChangeTodo.current = false
      }

      if (isLoadingTodos) setIsLoadingTodos(false)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // TODO: Change Adding, Modifiing and Deleting Operation to temporary use a helper Datastructure and set the State once after each docChange Event (Helps to increase Performance)

  useEffect(() => {
    if (!uid) return

    return firestoreCategoryPath.onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((docChange) => {
        if (docChange.type === 'removed') {
          // Category removed
          handleCategoryRemovedChange(docChange.doc.id)
        } else if (docChange.type === 'added') {
          // Category added
          handleCategoryAddedChange(docChange.doc)
        } else if (docChange.type === 'modified') {
          // Category modified
          handleCategoryModifiedChange(docChange.doc)
        } else {
          console.error(
            'Unexpected Error accured while processing incoming Firebase Data: \n' +
              JSON.stringify(docChange.doc)
          )
        }
      })

      if (isAddedChangeCategory.current) {
        sortCategoriesByCaegoryString()
        isAddedChangeCategory.current = false
      }

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
        {() => <TodoScreen todos={todos} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
