//region imports
import React, { useContext, useMemo, useRef, useState } from 'react'
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
import { HEADER_HEIGHT, HEADER_ICON_HEIGHT } from '../../constants/StyleGuides'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { ThemeContext } from '../../utils/ThemeContext'
import { CategoryLocal, TodoLocal } from '../../types/GeneralTypes'
import { useTodoStore } from '../../zustand/TodoStore'
import TodoEdit from '../../components/todoedit/TodoEdit'
import { STRING_ALL_TODOS } from '../../constants/Firebase'
import { v4 } from 'uuid'
import SafetyQuestion from '../../components/safetyQuestion/SafetyQuestion'
//#endregion

type TodoInputInitalProps = {
  initialValue: string
  submitFunction: (value: string, activeCategory?: CategoryLocal) => void
  submitButtonText: string
  titleText: string
}

const TodoScreen: React.FC<Props> = ({
  activeCategory: category,
  iconRight,
}: Props) => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>()
  const { theme } = useContext(ThemeContext)
  const styles = getStyles({ theme })
  const insets = useSafeAreaInsets()

  const selectedTodoId = useRef<string>()

  // TODO: zustand calls Store every time a rerender accurs
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

  // Modas States
  const todoInputInitialProps = useRef<TodoInputInitalProps>()
  const [isTodoInputModalShowing, setIsTodoInputModalShowing] =
    useState<boolean>(false)
  const [isTodoRemoveModalShowing, setIsTodoRemoveModalShowing] =
    useState<boolean>(false)
  const [isTodoEditModalShowing, setIsTodoEditModalShowing] =
    useState<boolean>(false)

  // Refs
  const todoInputRef = useRef<TodoInputRefFunctions>(null)

  // Getting SafeAreaInsets
  const safeareaInsets = useSafeAreaInsets()

  const isAusgabenCategory = useMemo(() => {
    return category?.title.toLocaleLowerCase().includes('ausgaben')
  }, [category])

  // TODO: Too many rerenders doe to zustand
  // Function for calculation total ausgaben in list
  const calculateTotalCosts = useMemo((): number => {
    if (!isAusgabenCategory) return 0
    let totalCosts = 0
    todos.forEach((todo) => {
      try {
        totalCosts +=
          parseFloat(todo.title.split(':')[1].replace(',', '.')) || 0
      } catch (error) {
        console.log(error)
      }
    })
    return totalCosts
  }, [todos, isAusgabenCategory])

  //#region Handler
  function setSelectedTodoId(id: string): void {
    selectedTodoId.current = id
  }
  function clearSelectedTodoId(): void {
    selectedTodoId.current = undefined
  }
  function clearTodoInputInitialValues(): void {
    todoInputInitialProps.current = undefined
  }
  function handleAddTodoModalActivation(): void {
    setIsTodoInputModalShowing(true)
  }
  function handleAddTodoModalDismiss(): void {
    clearTodoInputInitialValues()
    setIsTodoInputModalShowing(false)
  }
  function handleRemoveTodoModalActivation(): void {
    setIsTodoEditModalShowing(false)
    setIsTodoRemoveModalShowing(true)
  }
  function handleRemoveModalDismiss(): void {
    clearSelectedTodoId()
    setIsTodoRemoveModalShowing(false)
  }
  function handleTodoEditModalActivation(id: string): void {
    setSelectedTodoId(id)
    setIsTodoEditModalShowing(true)
  }
  function handleTodoEditModalDismiss(): void {
    clearSelectedTodoId()
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
      setIsTodoRemoveModalShowing(false)
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
              size={HEADER_ICON_HEIGHT}
              color={theme.backgroundColor}
              onPress={() => navigation.openDrawer()}
            />
            <View style={styles.headerTextWrapper}>
              <Text
                style={styles.headerText}
                numberOfLines={1}
              >
                {category ? category.title : "All Todo's"}
              </Text>
            </View>
            {iconRight ? (
              iconRight
            ) : (
              <View style={styles.headerPlaceholderRight} />
            )}
          </View>
        </View>
        {isAusgabenCategory && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 6,
              backgroundColor: theme.primaryGreyColor,
              marginBottom: -6,
              paddingBottom: 6,
            }}
          >
            <Text />
            <Text
              style={{
                fontWeight: '500',
                fontSize: 16,
                color: theme.darkColor,
                opacity: 0.85,
              }}
            >
              Anzahl: {todos.length}
            </Text>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 16,
                color: theme.darkColor,
                opacity: 0.85,
              }}
            >
              Summe: {calculateTotalCosts.toFixed(2)} €
            </Text>
            <Text />
          </View>
        )}
        <TodoList
          todos={todos}
          todoOnPress={(id) => handleToggleTodo(findTodoById(id, todos))}
          todoOnLongPress={(id) => handleTodoEditModalActivation(id)}
          displayTodoCategory={category ? false : true}
        />
        <Button
          value={isAusgabenCategory ? 'Add new Cost' : 'Add new Todo'}
          variant={'secondary'}
          onPress={() => handleAddTodoModalActivation()}
          style={{
            container: styles.footerButton,
            text: styles.footerText,
          }}
          inverted
          pressEffectSize={false}
        />
      </View>
      {isTodoInputModalShowing && (
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
            {...todoInputInitialProps.current}
          />
        </Modal>
      )}
      {isTodoRemoveModalShowing && (
        <Modal onBackdropPress={() => handleRemoveModalDismiss()}>
          <SafetyQuestion
            todo={findTodoById(selectedTodoId.current || '', todos)}
            acceptFunction={() =>
              handleRemoveTodo(
                findTodoById(selectedTodoId.current || '', todos)
              )
            }
            cancelFunction={() => handleRemoveModalDismiss()}
          />
        </Modal>
      )}
      {isTodoEditModalShowing && (
        <Modal
          onBackdropPress={() => handleTodoEditModalDismiss()}
          containerStyles={[
            styles.todoEditModalContainer,
            {
              paddingBottom: 12 + insets.bottom,
            },
          ]}
        >
          <TodoEdit
            todo={findTodoById(selectedTodoId.current || '', todos)}
            handleEdit={(title) => {
              setIsTodoEditModalShowing(false)
              setIsTodoInputModalShowing(true)
              todoInputInitialProps.current = {
                initialValue: title,
                submitFunction: (value) => {
                  console.log('hallp')
                  let refTodo = findTodoById(
                    selectedTodoId.current || '',
                    todos
                  )
                  if (refTodo) {
                    let modifiedTodo: TodoLocal = {
                      ...refTodo,
                      title: value,
                      lastChange: new Date(Date.now()),
                    }
                    modifyTodo(modifiedTodo)
                    modifyTodoFirebase(modifiedTodo)
                  }
                  handleAddTodoModalDismiss()
                },
                submitButtonText: 'Update',
                titleText: 'Edit Todo',
              }
            }}
            handleDelete={() => handleRemoveTodoModalActivation()}
          />
        </Modal>
      )}
      {!!safeareaInsets.bottom && (
        <View
          style={[
            styles.safeAreaBottomContainer,
            { height: safeareaInsets.bottom },
          ]}
        />
      )}
    </>
  )
  //#endregion
}
export default TodoScreen
