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

export const useTodoStore = create<TodoState>()((set) => ({
  todos: [],
  categories: [],
  categoryCounts: [{ categoryId: STRING_ALL_TODOS, count: 0 }],
  addTodo: (addedTodo: TodoLocal) => {
    set((state) => {
      const refTodo = state.todos.find((todo) => todo.id === addedTodo.id)
      if (refTodo) {
        if (
          !addedTodo.lastChange ||
          (refTodo.lastChange
            ? addedTodo.lastChange <= refTodo.lastChange
            : true)
        ) {
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

      return {
        todos: state.todos,
        // categoryCounts: state.categoryCounts.find(
        //   (categryCount) => categryCount.categoryId === addedTodo.categoryId
        // )
        //   ? state.categoryCounts.map((categoryCount) => {
        //       if (categoryCount.categoryId === addedTodo.categoryId) {
        //         return {
        //           categoryId: addedTodo.categoryId,
        //           count: categoryCount.count++,
        //         }
        //       }
        //       return categoryCount
        //     })
        //   : [
        //       ...state.categoryCounts,
        //       { categoryId: addedTodo.categoryId, count: 1 },
        //     ],
      }
    })
  },
  modifyTodo: (modifiedTodo: TodoLocal, databaseTodo: boolean = false) => {
    set((state) => {
      console.log('hallo')
      if (databaseTodo) {
        const refTodo = state.todos.find((todo) => todo.id === modifiedTodo.id)

        if (
          !refTodo ||
          !modifiedTodo.lastChange ||
          (refTodo.lastChange && modifiedTodo.lastChange <= refTodo.lastChange)
        ) {
          return {}
        }
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

      const helperTodos = state.todos.filter(
        (todo) => todo.id !== removedTodo.id
      )

      const helperCategoryCount = state.categoryCounts.map((categoryCount) => {
        if (categoryCount.categoryId === removedTodo.categoryId) {
          return {
            ...categoryCount,
            count: categoryCount.count - 1,
          }
        }
        return categoryCount
      })

      console.log(helperCategoryCount)

      return {
        todos: helperTodos,
        categoryCounts: helperCategoryCount,
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
          !addedCategory.lastChange ||
          (refCategory.lastChange
            ? addedCategory.lastChange <= refCategory.lastChange
            : true)
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
        state.categoryCounts = [
          ...state.categoryCounts,
          { categoryId: addedCategory.id, count: 0 },
        ]
      }

      return {
        categories: state.categories,
        categoryCounts: state.categoryCounts,
      }
    })
  },
  modifyCategory: (
    modifiedCategory: CategoryLocal,
    databaseCategory: boolean = false
  ) => {
    set((state) => {
      if (databaseCategory) {
        const refTodo = state.todos.find(
          (todo) => todo.id === modifiedCategory.id
        )

        if (
          !refTodo ||
          !modifiedCategory.lastChange ||
          (refTodo.lastChange &&
            modifiedCategory.lastChange <= refTodo.lastChange)
        ) {
          return {}
        }
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
      const categoryCountAdding =
        state.categoryCounts.find(
          (categoryCount) => categoryCount.categoryId === removedCategory.id
        )?.count || 0

      const categoryCounts = state.categoryCounts
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

      return {
        categories: state.categories.filter(
          (category) => category.id !== removedCategory.id
        ),
        todos: state.todos.map((todo) => {
          if (todo.categoryId === removedCategory.id) {
            return { ...todo, categoryId: categoryIdToAddRemainingTodos }
          }
          return todo
        }),
        categoryCounts,
      }
    })
  },
}))
