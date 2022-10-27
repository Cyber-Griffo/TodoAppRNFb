import React, { useContext, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Modal from '../../components/modal/Modal'
import TodoInput from '../../components/todoInput/TodoInput'
import { RefFunctions as TodoInputRefFunctions } from '../../components/todoInput/TodoInput.types'
import { getStyles } from './TodoScreen.styles'
import Button from '../../components/button/Button'
import TodoList from '../../components/todoList/TodoList'
import {
  addTodoFirebase,
  modifyTodoFirebase,
  removeTodoFirebase,
} from '../../database/FirebaseHandler'
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
import { TodoLocal } from '../../types/GeneralTypes'
import { useTodoStore } from '../../zustand/TodoStore'
import TodoEdit from '../../components/todoedit/TodoEdit'
import { STRING_ALL_TODOS } from '../../constants/Firebase'
import { v4 } from 'uuid'
import { Props as TodoInputProps } from '../../components/todoInput/TodoInput.types'
import SafetyQuestion from '../../components/safetyquestion/SafetyQuestion'

const TodoScreen: React.FC<Props> = ({ activeCategory: category }: Props) => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>()
  const { theme } = useContext(ThemeContext)
  const styles = getStyles({ theme })
  const insets = useSafeAreaInsets()
  // TODO: Many Rerenders (Modal...)
  // State for managing Todos
  const [selectedTodoId, setSelectedTodoId] = useState<string>('')

  const categories = useTodoStore((state) => state.categories)
  const todos = useTodoStore((state) =>
    category
      ? state.todos
          .filter((todo) => todo.categoryId === category.id)
          .sort((a, b) => {
            return todoSortingConditions(a, b)
          })
      : state.todos.sort((a, b) => {
          return todoSortingConditionsMainScreen(a, b, categories)
        })
  )
  const modifyTodo = useTodoStore((state) => state.modifyTodo)
  const removeTodo = useTodoStore((state) => state.removeTodo)
  const addTodo = useTodoStore((state) => state.addTodo)

  // State for correct Modal to show
  const [isAddTodoModalShowing, setIsAddTodoModalShowing] =
    useState<boolean>(false)
  const addingTodoModalProps = useRef<TodoInputProps>()
  const [isRemoveTodoModalShowing, setIsRemoveTodoModalShowing] =
    useState<boolean>(false)
  const [isTodoEditModalShowing, setIsTodoEditModalShowing] =
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
    setIsTodoEditModalShowing(false)
    setIsRemoveTodoModalShowing(true)
  }
  function handleRemoveModalDismiss(): void {
    setIsRemoveTodoModalShowing(false)
  }
  function handleTodoEditModalActivation(id: string): void {
    setSelectedTodoId(id)
    setIsTodoEditModalShowing(true)
  }
  function handleTodoEditModalDismiss(): void {
    setIsTodoEditModalShowing(false)
  }

  function handleToggleTodo(todo?: TodoLocal): void {
    if (todo) {
      const newTodo: TodoLocal = {
        ...todo,
        done: !todo.done,
        lastChange: new Date(Date.now()),
      }
      modifyTodo(newTodo)
      modifyTodoFirebase(newTodo)
    } else {
      console.error('Fehler beim Toggeln eines Todos')
    }
  }
  function handleRemoveTodo(todo?: TodoLocal): void {
    if (todo) {
      removeTodo(todo)
      removeTodoFirebase(todo)
      setIsRemoveTodoModalShowing(false)
    } else {
      console.error('Removing Error')
    }
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
          todoOnPress={(id) => handleToggleTodo(findTodoById(id, todos))}
          todoOnLongPress={(id) => handleTodoEditModalActivation(id)}
          displayTodoCategory={category ? false : true}
        />
        <Button
          value={'Add new Todo'}
          variant={'secondary'}
          onPress={() => handleAddTodoModalActivation()}
          style={{
            container: styles.footerButton,
            text: styles.footerText,
          }}
          pressEffectColor={false}
          pressEffectSize={false}
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
            cancelFunction={() => handleAddTodoModalDismiss()}
            submitFunction={(title, activeCategory) => {
              const todo = {
                categoryId: activeCategory
                  ? activeCategory.id
                  : STRING_ALL_TODOS,
                title,
                timestamp: new Date(Date.now()),
                lastChange: new Date(Date.now()),
                done: false,
                id: v4(),
              }
              addTodo(todo)
              addTodoFirebase(todo)
            }}
            activeCategory={category}
            {...addingTodoModalProps.current}
          />
        </Modal>
      )}
      {isRemoveTodoModalShowing && (
        <Modal onBackdropPress={() => handleRemoveModalDismiss()}>
          <SafetyQuestion
            title={findTodoById(selectedTodoId, todos)?.title || ''}
            acceptFunction={() =>
              handleRemoveTodo(findTodoById(selectedTodoId, todos))
            }
            cancelFunction={() => handleRemoveModalDismiss()}
          />
        </Modal>
      )}
      {isTodoEditModalShowing && (
        <Modal
          onBackdropPress={() => handleTodoEditModalDismiss()}
          containerStyles={{
            justifyContent: 'flex-end',
            paddingBottom: 12 + insets.bottom,
          }}
        >
          <TodoEdit
            todo={findTodoById(selectedTodoId, todos)}
            handleEdit={(title) => {
              setIsTodoEditModalShowing(false)
              setIsAddTodoModalShowing(true)
              // addingTodoModalProps.current = { initialValue: title }
            }}
            handleDelete={(id) => handleRemoveTodoModalActivation(id)}
          />
        </Modal>
      )}
    </>
  )
  //#endregion
}
export default TodoScreen
