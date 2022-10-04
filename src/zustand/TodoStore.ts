import create from 'zustand'
import { STRING_ALL_TODOS } from '../constants/Firebase'
import { CategoryCount, CategoryLocal, TodoLocal } from '../types/GeneralTypes'

interface TodoState {
  todos: TodoLocal[]
  categories: CategoryLocal[]
  categoryCounts: CategoryCount[]
  addTodo: (addedTodo: TodoLocal) => void
  modifyTodo: (modifiedTodo: TodoLocal, databaseTodo?: boolean) => void
  removeTodo: (removedTodo: TodoLocal) => void
  addCategory: (addedCategory: CategoryLocal) => void
  modifyCategory: (
    modifiedCategory: CategoryLocal,
    databaseCategory?: boolean
  ) => void
  removeCategory: (
    removedCategory: CategoryLocal,
    categoryIdToAddRemainingTodos?: string
  ) => void
}

function deleteTodo(todos: TodoLocal[], removedTodo: TodoLocal): TodoLocal[] {
  return todos.filter((todo) => todo.id !== removedTodo.id)
}

function updateCategoryCounts(
  categoryCounts: CategoryCount[],
  categoryId: string,
  action: 'add' | 'remove',
  initialCount: number = 0
): CategoryCount[] {
  let categoryCountExists = categoryCounts.find(
    (cc) => cc.categoryId === categoryId
  )
  if (categoryCountExists) {
    return categoryCounts.map((categoryCount) => {
      if (categoryCount.categoryId === categoryId) {
        return {
          categoryId: categoryCount.categoryId,
          count:
            action === 'add'
              ? categoryCount.count + 1
              : action === 'remove'
              ? categoryCount.count - 1
              : categoryCount.count,
        }
      }
      return categoryCount
    })
  } else {
    if (action === 'add') {
      return [...categoryCounts, { categoryId, count: initialCount }]
    }
  }
  return categoryCounts
}

export const useTodoStore = create<TodoState>()((set) => ({
  todos: [],
  categories: [],
  categoryCounts: [{ categoryId: STRING_ALL_TODOS, count: 0 }],
  addTodo: (addedTodo: TodoLocal) => {
    set((state) => {
      const refTodo = state.todos.find((todo) => todo.id === addedTodo.id)
      if (refTodo) {
        if (refTodo.lastChange && addedTodo.lastChange <= refTodo.lastChange) {
          return {}
        }
        state.todos = state.todos.map((todo) => {
          if (todo.id === addedTodo.id) {
            return addedTodo
          }
          return todo
        })
      } else {
        state.todos = [...state.todos, addedTodo]
      }

      state.categoryCounts = refTodo
        ? state.categoryCounts
        : updateCategoryCounts(
            state.categoryCounts,
            addedTodo.categoryId,
            'add',
            1
          )

      return {
        todos: state.todos,
        categoryCounts: state.categoryCounts,
      }
    })
  },
  modifyTodo: (modifiedTodo: TodoLocal) => {
    set((state) => {
      const refTodo = state.todos.find((todo) => todo.id === modifiedTodo.id)

      if (!refTodo || modifiedTodo.lastChange <= refTodo.lastChange) {
        return {}
      }

      return {
        todos: state.todos.map((todo) => {
          if (todo.id === modifiedTodo.id) {
            return modifiedTodo
          }
          return todo
        }),
      }
    })
  },
  removeTodo: (removedTodo: TodoLocal) => {
    set((state) => {
      if (!state.todos.find((todo) => todo.id === removedTodo.id)) return {}

      return {
        todos: deleteTodo(state.todos, removedTodo),
        categoryCounts: state.categoryCounts.map((categoryCount) => {
          if (categoryCount.categoryId === removedTodo.categoryId) {
            return {
              ...categoryCount,
              count: categoryCount.count - 1,
            }
          }
          return categoryCount
        }),
      }
    })
  },
  addCategory: (addedCategory: CategoryLocal) => {
    set((state) => {
      const refCategory = state.categories.find(
        (todo) => todo.id === addedCategory.id
      )
      if (refCategory) {
        if (
          refCategory.lastChange &&
          addedCategory.lastChange <= refCategory.lastChange
        ) {
          return {}
        }
        state.categories = state.categories.map((category) => {
          if (category.id === refCategory.id) {
            return addedCategory
          }
          return category
        })
      } else {
        state.categories = [...state.categories, addedCategory]
      }

      if (
        !state.categoryCounts.find(
          (categryCount) => categryCount.categoryId === addedCategory.id
        )
      ) {
        state.categoryCounts = updateCategoryCounts(
          state.categoryCounts,
          addedCategory.id,
          'add'
        )
      }

      return {
        categories: state.categories,
        categoryCounts: state.categoryCounts,
      }
    })
  },
  modifyCategory: (modifiedCategory: CategoryLocal) => {
    set((state) => {
      const refTodo = state.todos.find(
        (todo) => todo.id === modifiedCategory.id
      )

      if (!refTodo || modifiedCategory.lastChange <= refTodo.lastChange) {
        return {}
      }

      return {
        categories: state.categories.map((category) => {
          if (category.id === modifiedCategory.id) {
            return modifiedCategory
          }
          return category
        }),
      }
    })
  },
  removeCategory: (
    removedCategory: CategoryLocal,
    categoryIdToAddRemainingTodos: string = STRING_ALL_TODOS
  ) => {
    set((state) => {
      const refCategory = state.categories.find(
        (category) => category.id === removedCategory.id
      )
      if (!refCategory) return {}

      state.categories = state.categories.filter(
        (category) => category.id !== removedCategory.id
      )

      const categoryCountAdding =
        state.categoryCounts.find(
          (categoryCount) => categoryCount.categoryId === removedCategory.id
        )?.count || 0

      if (categoryCountAdding !== 0) {
        state.categoryCounts = state.categoryCounts
          .map((categoryCount) => {
            if (categoryCount.categoryId === categoryIdToAddRemainingTodos) {
              return {
                ...categoryCount,
                count: categoryCount.count + categoryCountAdding,
              }
            }
            return categoryCount
          })
          .filter(
            (categoryCount) => categoryCount.categoryId !== removedCategory.id
          )
      }

      state.todos = state.todos.map((todo) => {
        if (todo.categoryId === removedCategory.id) {
          return { ...todo, categoryId: categoryIdToAddRemainingTodos }
        }
        return todo
      })

      return {
        todos: state.todos,
        categories: state.categories,
        categoryCounts: state.categoryCounts,
      }
    })
  },
}))
