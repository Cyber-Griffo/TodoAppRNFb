import React, { useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Modal from '../../components/modal/Modal'
import SafetyQuestion from '../../components/safetyQuestion/SafetyQuestion'
import TodoInput from '../../components/todoInput/TodoInput'
import { RefFunctions as TodoInputRefFunctions } from '../../components/todoInput/TodoInput.types'
import { getStyles } from './TodoScreen.styles'
import Button from '../../components/button/Button'
import TodoList from '../../components/todoList/TodoList'
import { addTodo, removeTodo, toggleTodo } from '../../database/FirebaseHandler'
import {
  findTodoById,
  todoSortingConditionsMainScreen,
} from '../../helper/TodoHelper'
import { TodoScreenProps as Props } from './TodoScreen.types'
import { HEADER_HEIGHT } from '../../constants/StyleGuides'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'

const TodoScreen = ({ todos, category = '' }: Props) => {
  const navigation = useNavigation()
  const styles = getStyles()
  // TODO: Many Rerenders (Modal...)
  // State for managing Todos
  // console.log(todos)
  const [selectedTodoId, setSelectedTodoId] = useState<string>('')

  if (category === '') {
    todos = todos.sort((a, b) => {
      return todoSortingConditionsMainScreen(a, b)
    })
  }

  // State for correct Modal to show
  const [isAddTodoModalShowing, setIsAddTodoModalShowing] =
    useState<boolean>(false)
  const [isRemoveTodoModalShowing, setIsRemoveTodoModalShowing] =
    useState<boolean>(false)

  // Refs
  const todoInputRef = useRef<TodoInputRefFunctions>(null)

  // Getting SafeAreaInsets
  const safeareaInsets = useSafeAreaInsets()

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
  function handleAddTodo(title: string, categoryTitle: string) {
    addTodo(title, categoryTitle)
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
            <MaterialIcon
              name="menu"
              style={{ position: 'absolute', left: 12 }}
              size={24}
              color={'white'}
              onPress={() => navigation.openDrawer()}
            />
            <Text style={styles.headerText}>
              {category === '' ? "All Todo's" : category}
            </Text>
          </View>
        </View>
        <TodoList
          todos={todos}
          todoOnPress={(id, done) => handleToggleTodo(id, done)}
          todoOnLongPress={(id) => handleRemoveTodoModalActivation(id)}
          displayTodoCategory={category === '' ? true : false}
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
            createFunction={(title, categoryTitle) =>
              handleAddTodo(title, categoryTitle)
            }
            cancelFunction={() => handleAddTodoModalDismiss()}
            category={category}
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
