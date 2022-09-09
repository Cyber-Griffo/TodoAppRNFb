import React, { useEffect, useRef, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import TodoScreen from '../screens/todo/TodoScreen'
import { Todo } from '../screens/todo/TodoScreen.types'
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'
import { todoSortingConditions } from '../helper/TodoHelper'
import { Text, View } from 'react-native'

const Stack = createDrawerNavigator()

// TODO: Firebase Logic

// TODO: Screen Template to render Categories

export function MainStack() {
  // const [todos, setTodos] = useState<Map<string, Todo[]>>()
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const isAddedChange = useRef<boolean>(false)

  function handleRemovedChange(id: string) {
    setTodos((currTodos) => {
      return currTodos?.filter((todo) => todo.id !== id)
    })
  }
  function handleAddedChange(
    doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
  ) {
    const { title, done, timestamp } = doc.data()
    if (todos.find((todo) => todo.id === doc.id)) {
      return
    }
    setTodos((currTodos) => {
      return [
        ...currTodos,
        { id: doc.id, title, done, timestamp, category: '' },
      ]
    })
  }
  function handleModifiedChange(
    doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
  ) {
    const { title, done, timestamp } = doc.data()
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
  function sortTodosByDoneThenTimestamp() {
    setTodos((currTodos) => {
      return currTodos.sort((a, b) => {
        return todoSortingConditions(a, b)
      })
    })
  }

  useEffect(() => {
    return firestore()
      .collection('todos')
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((docChange) => {
          if (docChange.type === 'removed') {
            handleRemovedChange(docChange.doc.id)
          } else if (docChange.type === 'added') {
            handleAddedChange(docChange.doc)
            isAddedChange.current = true
          } else if (docChange.type === 'modified') {
            handleModifiedChange(docChange.doc)
          } else {
            console.error(
              'Unexpected Error accured while processing incoming Firebase Data: \n' +
                JSON.stringify(docChange.doc)
            )
          }
        })

        if (isAddedChange.current) {
          sortTodosByDoneThenTimestamp()
          isAddedChange.current = false
        }

        if (isLoading) setIsLoading(false)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
