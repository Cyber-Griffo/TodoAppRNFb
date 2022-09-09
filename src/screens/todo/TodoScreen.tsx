import React, { useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Modal from '../../components/modal/Modal'
import SafetyQuestion from '../../components/safetyQuestion/SafetyQuestion'
import TodoInput from '../../components/todoInput/TodoInput'
import { RefFunctions as TodoInputRefFunctions } from '../../components/todoInput/TodoInput.types'
import { getStyles } from './TodoScreen.styles'
import Button from '../../components/button/Button'
import auth from '@react-native-firebase/auth'
import TodoList from '../../components/todoList/TodoList'
import { addTodo, removeTodo, toggleTodo } from '../../database/FirebaseHandler'
import { findTodoById } from '../../helper/TodoHelper'
import { TodoScreenProps as Props } from './TodoScreen.types'

//! Defined Variables
const HEADER_HEIGHT = 56
const FOOTER_HEIGHT = 48

const TodoScreen = ({ todos }: Props) => {
  const styles = getStyles({ HEADER_HEIGHT, FOOTER_HEIGHT })

  // State for managing Todos
  console.log(todos)
  const [selectedTodoId, setSelectedTodoId] = useState<string>('')

  // State for correct Modal to show
  const [isAddTodoModalShowing, setIsAddTodoModalShowing] =
    useState<boolean>(false)
  const [isRemoveTodoModalShowing, setIsRemoveTodoModalShowing] =
    useState<boolean>(false)

  // Refs
  const todoInputRef = useRef<TodoInputRefFunctions>(null)

  // Getting SafeAreaInsets
  const safeareaInsets = useSafeAreaInsets()

  //! Warning just for testing purposes

  /*   function removeAllTestTodo() {
    todos?.forEach((todo) => {
      if (todo.title === 'Test') {
        removeTodo(todo.id)
      }
    })
  } */

  //#region Handler
  function handleAddTodoModalActivation() {
    setIsAddTodoModalShowing(true)
  }
  function handleAddTodoModalDismiss() {
    setIsAddTodoModalShowing(false)
  }
  function handleRemoveTodoModalActivation(id: string) {
    setSelectedTodoId(id)
    setIsRemoveTodoModalShowing(true)
  }
  function handleRemoveModalDismiss() {
    setIsRemoveTodoModalShowing(false)
  }

  function handleRemoveTodo(id: string) {
    removeTodo(id)
    setIsRemoveTodoModalShowing(false)
  }
  function handleAddTodo(title: string) {
    addTodo(title)
  }
  function handleToggleTodo(id: string, oldValue: boolean): void {
    toggleTodo(id, !oldValue)
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
        <TodoList
          todos={todos}
          todoOnPress={(id, done) => handleToggleTodo(id, done)}
          todoOnLongPress={(id) => handleRemoveTodoModalActivation(id)}
        />
        <Button
          value={'logout'}
          onPress={() => auth().signOut()}
        />
        <Button
          value={'Add new Todo'}
          variant={'secondary'}
          onPress={() => handleAddTodoModalActivation()}
          style={{
            container: styles.footerButton,
            text: styles.footerText,
          }}
          touchableProps={{
            activeOpacity: 1,
          }}
        />
      </View>
      {isAddTodoModalShowing && (
        <Modal
          onBackdropPress={() => {
            if (todoInputRef.current?.isInputEmpty()) {
              handleAddTodoModalDismiss()
            }
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
            title={findTodoById(selectedTodoId, todos)?.title || ''}
            acceptFunction={() => handleRemoveTodo(selectedTodoId)}
            cancelFunction={() => handleRemoveModalDismiss()}
          />
        </Modal>
      )}
    </>
  )
  //#endregion
}
export default TodoScreen
