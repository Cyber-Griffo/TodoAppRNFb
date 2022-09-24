import React, { useContext, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Modal from '../../components/modal/Modal'
import SafetyQuestion from '../../components/safetyquestion/SafetyQuestion'
import TodoInput from '../../components/todoInput/TodoInput'
import { RefFunctions as TodoInputRefFunctions } from '../../components/todoInput/TodoInput.types'
import { getStyles } from './TodoScreen.styles'
import Button from '../../components/button/Button'
import TodoList from '../../components/todoList/TodoList'
import { addTodo, removeTodo, toggleTodo } from '../../database/FirebaseHandler'
import {
  findTodoById,
  todoSortingConditions,
  todoSortingConditionsMainScreen,
} from '../../helper/TodoHelper'
import { TodoScreenProps as Props } from './TodoScreen.types'
import { HEADER_HEIGHT } from '../../constants/StyleGuides'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { ThemeContext } from '../../utils/ThemeContext'

const TodoScreen: React.FC<Props> = ({
  todos: rawTodos,
  activeCategory: category,
  categories,
}: Props) => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>()
  const { theme } = useContext(ThemeContext)
  const styles = getStyles({ theme })
  // TODO: Many Rerenders (Modal...)
  // State for managing Todos
  const [selectedTodoId, setSelectedTodoId] = useState<string>('')

  const todos = category
    ? rawTodos.sort((a, b) => {
        return todoSortingConditions(a, b)
      })
    : rawTodos.sort((a, b) => {
        return todoSortingConditionsMainScreen(a, b, categories)
      })

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
  function handleAddTodoModalActivation(): void {
    setIsAddTodoModalShowing(true)
  }
  function handleAddTodoModalDismiss(): void {
    setIsAddTodoModalShowing(false)
  }
  function handleRemoveTodoModalActivation(id: string): void {
    setSelectedTodoId(id)
    setIsRemoveTodoModalShowing(true)
  }
  function handleRemoveModalDismiss(): void {
    setIsRemoveTodoModalShowing(false)
  }

  function handleRemoveTodo(id: string): void {
    removeTodo(id)
    setIsRemoveTodoModalShowing(false)
  }
  function handleAddTodo(title: string, categoryId: string): void {
    addTodo(title, categoryId)
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
              style={styles.menuIcon}
              size={28}
              color={theme.backgroundColor}
              onPress={() => navigation.openDrawer()}
            />
            <Text style={styles.headerText}>
              {category ? category.title : "All Todo's"}
            </Text>
          </View>
        </View>
        <TodoList
          todos={todos}
          categories={categories}
          todoOnPress={(id, done) => handleToggleTodo(id, done)}
          todoOnLongPress={(id) => handleRemoveTodoModalActivation(id)}
          displayTodoCategory={category ? false : true}
        />
        <Button
          value={'Add new Todo'}
          variant={'secondary'}
          onPress={
            () => handleAddTodoModalActivation() /* {
            // TESTING_ONLY_ADD_MANY_CATEGORIES(5)
            // TESTING_ONLY_REMOVE_ALL_CATEGORIES()
            // TESTING_ONLY_REMOVE_ALL_TODOS()
            // TESTING_ONLY_ADD_MANY_TODOS(1)
          } */
          }
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
            createFunction={handleAddTodo}
            cancelFunction={() => handleAddTodoModalDismiss()}
            categories={categories}
            activeCategory={category}
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
