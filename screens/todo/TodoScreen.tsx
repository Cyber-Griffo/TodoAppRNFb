import React, { useEffect, useRef, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'
import TodoElement from '../../src/components/todoelement/TodoElement'
import Modal from '../../src/components/modal/Modal'
import SafetyQuestion from '../../src/components/safetyQuestion/SafetyQuestion'
import TodoInput from '../../src/components/todoInput/TodoInput'
import { RefFunctions as TodoInputRefFunctions } from '../../src/components/todoInput/TodoInput.types'
import useAsyncStorage from '../../src/hooks/useAsyncStorage'

type Todo = {
  done: boolean
  title: string
  id: string
  timestamp: FirebaseFirestoreTypes.Timestamp
}

type DataTodo = {
  title: string
  data: Todo[]
}

//! Defined Variables
const HEADER_HEIGHT = 56
const FOOTER_HEIGHT = 48

const TodoScreen = () => {
  // State for managing Todos
  const [todos, setTodos] = useState<Todo[]>([])
  const [selectedTodoId, setSelectedTodoId] = useState<string>('')

  // State for managing loading
  const [isLoading, setIsLoading] = useState(true)

  // State for correct Modal to show
  const [isAddTodoModalShowing, setIsAddTodoModalShowing] =
    useState<boolean>(false)
  const [isRemoveTodoModalShowing, setIsRemoveTodoModalShowing] =
    useState<boolean>(false)

  // Async Storage for Filter
  const [filter, setFiler] = useAsyncStorage('filter', 'timestamp')

  // Refs
  const todoInputRef = useRef<TodoInputRefFunctions>(null)
  const isRemoveChange = useRef<boolean>(false)

  // Getting SafeAreaInsets
  const safeareaInsets = useSafeAreaInsets()

  //#region Interaction with Firebase
  function toggleTodo(id: string) {
    const todo = findTodoById(id)
    if (!todo) return

    firestore()
      .collection('todos')
      .doc(id)
      .update({
        done: !todo?.done,
      })
      .then(() => {
        console.log(
          'Updating ' +
            "'" +
            todo?.title +
            "'" +
            ' to ' +
            "'" +
            !todo?.done +
            "'"
        )
      })
  }
  function addTodo(title: string) {
    firestore()
      .collection('todos')
      .add({
        title,
        done: false,
        timestamp: firestore.FieldValue.serverTimestamp(),
      })
      .then(() =>
        console.log('New Todo: ' + "'" + title + "'" + ' successfully added.')
      )
  }
  function removeTodo(id: string) {
    if (id === '') return
    const todo = findTodoById(id)
    if (!todo) return

    firestore()
      .collection('todos')
      .doc(todo.id)
      .delete()
      .then(() => console.log('Successfully removed Todo: ' + todo.title))
  }
  //! Warning just for testing purposes
  function removeAllTestTodo() {
    todos?.forEach((todo) => {
      if (todo.title === 'Test') {
        removeTodo(todo.id)
      }
    })
  }
  //#endregion

  //#region Helper functions
  function findTodoById(id: string): Todo | undefined {
    return todos?.find((todo) => todo.id == id)
  }
  function sortTodosByDoneThenTimestamp() {
    setTodos((currTodos) => {
      return currTodos.sort((a, b) => {
        return a.done === b.done ? checkForTimestamp(a, b) : a.done ? 1 : -1
      })
    })
  }
  function checkForTimestamp(a: Todo, b: Todo) {
    if (a.timestamp?.valueOf() < b.timestamp?.valueOf()) {
      return -1
    }
    return 1
  }
  //#endregion

  //#region Handle Modal State
  function handleAddTodoModalDismiss() {
    setIsAddTodoModalShowing(false)
  }
  function handleRemoveModalDismiss() {
    setIsRemoveTodoModalShowing(false)
  }
  function handleRemoveTodoModalActivation(id: string) {
    setSelectedTodoId(id)
    setIsRemoveTodoModalShowing(true)
  }
  function handleAddTodoModalActivation() {
    setIsAddTodoModalShowing(true)
  }
  function handleRemoveTodo() {
    removeTodo(selectedTodoId || '')
    setIsRemoveTodoModalShowing(false)
  }
  function handleAddTodo(title: string) {
    addTodo(title)
  }
  //#endregion

  //#region Fetching Data from Firebase
  useEffect(() => {
    //#region helper functions for setting State correctly
    function handleRemovedChange(id: string) {
      setTodos((currTodos) => {
        return currTodos?.filter((todo) => todo.id !== id)
      })
    }
    function handleAddedChange(
      doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
    ) {
      const { title, done, timestamp } = doc.data()
      if (todos.find((todo) => todo.id === doc.id)) return
      setTodos((currTodos) => {
        return [...currTodos, { id: doc.id, title, done, timestamp }]
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
              return { id: doc.id, title, done, timestamp }
            } else {
              return todo
            }
          })
          .sort((a, b) => {
            return a.done === b.done ? checkForTimestamp(a, b) : a.done ? 1 : -1
          })
      })
    }
    //#endregion

    return firestore()
      .collection('todos')
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((docChange) => {
          if (docChange.type === 'removed') {
            handleRemovedChange(docChange.doc.id)
          } else if (docChange.type === 'added') {
            handleAddedChange(docChange.doc)
            isRemoveChange.current = true
          } else if (docChange.type === 'modified') {
            handleModifiedChange(docChange.doc)
          } else {
            console.error(
              'Unexpected Error accured while processing incoming Firebase Data: \n' +
                JSON.stringify(docChange.doc)
            )
          }
        })

        if (isRemoveChange.current) {
          sortTodosByDoneThenTimestamp()
          isRemoveChange.current = false
        }

        if (isLoading) setIsLoading(false)
      })
  }, [])
  //#endregion

  //#region Loading Screen
  if (isLoading) {
    return (
      <View style={styles.loadingScreenContainer}>
        <Text style={styles.loadingScreenText}>Loading</Text>
      </View>
    )
  }
  //#endregion

  //#region App
  return (
    <>
      <View
        style={[
          styles.wrapperContainer,
          { paddingBottom: safeareaInsets.bottom },
        ]}
      >
        <View
          style={[
            styles.headerWrapper,
            { height: safeareaInsets.top + HEADER_HEIGHT },
          ]}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Your Todo's</Text>
          </View>
        </View>
        <FlatList
          style={styles.list}
          data={todos}
          renderItem={({ item }) => (
            <TodoElement
              done={item.done}
              title={item.title}
              id={item.id}
              toggleTodo={(id) => toggleTodo(id)}
              removeTodo={(id) => handleRemoveTodoModalActivation(id)}
            />
          )}
          keyExtractor={({ id }) => id}
        />
        <TouchableWithoutFeedback
          onPress={() => handleAddTodoModalActivation()}
        >
          <View style={styles.footerButton}>
            <Text style={styles.footerText}>Add new Todo</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {isAddTodoModalShowing && (
        <Modal
          onBackdropPress={() => {
            if (todoInputRef.current?.isInputEmpty())
              handleAddTodoModalDismiss()
          }}
        >
          <TodoInput
            ref={todoInputRef}
            createFunction={(title) => handleAddTodo(title)}
            cancelFunction={() => handleAddTodoModalDismiss()}
          />
        </Modal>
      )}
      {isRemoveTodoModalShowing && (
        <Modal onBackdropPress={() => handleRemoveModalDismiss()}>
          <SafetyQuestion
            title={
              todos.find((todo) => todo.id === selectedTodoId)?.title || ''
            }
            acceptFunction={() => handleRemoveTodo()}
            cancelFunction={() => handleRemoveModalDismiss()}
          />
        </Modal>
      )}
    </>
  )
  //#endregion
}

const styles = StyleSheet.create({
  wrapperContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  headerWrapper: {
    justifyContent: 'flex-end',
    backgroundColor: '#1AA3FF',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  headerContainer: {
    height: HEADER_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
  list: {
    zIndex: -1,
  },
  footerButton: {
    width: '100%',
    height: FOOTER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: '#1AA3FF',
    fontSize: 18,
  },

  // Loading State
  loadingScreenContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingScreenText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 18,
  },
})

export default TodoScreen
