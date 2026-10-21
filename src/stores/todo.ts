import { computed, ref, watch } from 'vue'

import { defineStore } from 'pinia'

import { useToast } from 'primevue'

import { LANGUAGE, TODO_FILTER } from '@/enum/global'
import type { Todo } from '@/types/Todo'

import { TODO_CLEARED_MESSAGE, TODO_CREATED_MESSAGE, TODO_DELETED_MESSAGE } from '@/lang/todo'

import { useAppDataStore } from '@/stores/appData'

const TODO_STORAGE_KEY = 'todos'

const getStoredTodos = (): Todo[] => {
  try {
    const storedTodos: unknown = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY) ?? '[]')
    return Array.isArray(storedTodos) ? storedTodos : []
  } catch {
    return []
  }
}

const isVisible = (todo: Todo, filter: TODO_FILTER): boolean => {
  if (filter === TODO_FILTER.ACTIVE) return !todo.done
  if (filter === TODO_FILTER.COMPLETED) return todo.done
  return true
}

export const useTodoStore = defineStore('todo', () => {
  const appData = useAppDataStore()
  const toast = useToast()

  const todos = ref<Todo[]>(getStoredTodos())
  const filter = ref<TODO_FILTER>(TODO_FILTER.ALL)

  const activeCount = computed(() => todos.value.filter((todo) => !todo.done).length)
  const completedCount = computed(() => todos.value.length - activeCount.value)
  const visibleTodos = computed(() => todos.value.filter((todo) => isVisible(todo, filter.value)))

  watch(todos, (newTodos) => localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(newTodos)), {
    deep: true,
  })

  const showSuccessToast = (message: Record<LANGUAGE, string>) => {
    toast.add({ severity: 'success', summary: message[appData.language], life: 3000 })
  }

  const addTodo = (text: string) => {
    todos.value.unshift({ id: crypto.randomUUID(), text, done: false, createdAt: Date.now() })
    showSuccessToast(TODO_CREATED_MESSAGE)
  }

  const toggleTodo = (id: string) => {
    const todo = todos.value.find((todo) => todo.id === id)
    if (todo) todo.done = !todo.done
  }

  const removeTodo = (id: string) => {
    todos.value = todos.value.filter((todo) => todo.id !== id)
    showSuccessToast(TODO_DELETED_MESSAGE)
  }

  const clearCompleted = () => {
    todos.value = todos.value.filter((todo) => !todo.done)
    showSuccessToast(TODO_CLEARED_MESSAGE)
  }

  return {
    todos,
    filter,
    activeCount,
    completedCount,
    visibleTodos,
    addTodo,
    toggleTodo,
    removeTodo,
    clearCompleted,
  }
})
