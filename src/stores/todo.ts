import { computed, ref } from 'vue'

import { defineStore } from 'pinia'

import { useToast } from 'primevue'

import { LANGUAGE, TODO_FILTER } from '@/enum/global'
import type { DisplayTodo, TodoRecord } from '@/types/Todo'

import {
  TODO_CLEARED_MESSAGE,
  TODO_CREATE_FAILURE_MESSAGE,
  TODO_CREATED_MESSAGE,
  TODO_DELETE_FAILURE_MESSAGE,
  TODO_DELETED_MESSAGE,
  TODO_UPDATE_FAILURE_MESSAGE,
} from '@/lang/todo'

import { useAppDataStore } from '@/stores/appData'

import { TodoAPI } from '@/api/authApi'
import { apiService } from '@/services/apiService'

const todoApi = new TodoAPI(apiService)

const toDisplayTodo = (todo: TodoRecord): DisplayTodo => ({
  id: todo.id,
  title: todo.title,
  isCompleted: todo.is_completed,
  createdAt: todo.created_at,
  updatedAt: todo.updated_at,
})

const isVisible = (todo: DisplayTodo, filter: TODO_FILTER): boolean => {
  if (filter === TODO_FILTER.ACTIVE) return !todo.isCompleted
  if (filter === TODO_FILTER.COMPLETED) return todo.isCompleted
  return true
}

export const useTodoStore = defineStore('todo', () => {
  const appData = useAppDataStore()
  const toast = useToast()

  const todos = ref<DisplayTodo[]>([])
  const filter = ref<TODO_FILTER>(TODO_FILTER.ALL)
  const isLoading = ref(false)

  const activeCount = computed(() => todos.value.filter((todo) => !todo.isCompleted).length)
  const completedCount = computed(() => todos.value.length - activeCount.value)
  const visibleTodos = computed(() => todos.value.filter((todo) => isVisible(todo, filter.value)))

  const showToast = (severity: 'success' | 'error', message: Record<LANGUAGE, string>) => {
    toast.add({ severity, summary: message[appData.language], life: 3000 })
  }

  const loadTodos = async () => {
    const records = await todoApi.getTodos()
    todos.value = records
      .map(toDisplayTodo)
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  }

  const fetchTodos = async () => {
    isLoading.value = true
    await loadTodos()
    isLoading.value = false
  }

  // Returns whether the todo was created, so the caller can keep the draft on failure.
  // createTodo() doesn't return the new todo, so the list is reloaded to pick up its id and date.
  const addTodo = async (text: string): Promise<boolean> => {
    const isCreated = await todoApi.createTodo({ title: text })
    if (!isCreated) {
      showToast('error', TODO_CREATE_FAILURE_MESSAGE)
      return false
    }
    await loadTodos()
    showToast('success', TODO_CREATED_MESSAGE)
    return true
  }

  const toggleTodo = async (id: string) => {
    const isToggled = await todoApi.toggleTodoStatus(id)
    if (!isToggled) return showToast('error', TODO_UPDATE_FAILURE_MESSAGE)
    todos.value = todos.value.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
    )
  }

  const removeTodo = async (id: string) => {
    const isDeleted = await todoApi.deleteTodo(id)
    if (!isDeleted) return showToast('error', TODO_DELETE_FAILURE_MESSAGE)
    todos.value = todos.value.filter((todo) => todo.id !== id)
    showToast('success', TODO_DELETED_MESSAGE)
  }

  // The API has no bulk delete, so each completed todo is deleted on its own
  const clearCompleted = async () => {
    const completedIds = todos.value.filter((todo) => todo.isCompleted).map((todo) => todo.id)
    const results = await Promise.all(completedIds.map((id) => todoApi.deleteTodo(id)))
    const deletedIds = new Set(completedIds.filter((_, index) => results[index]))
    todos.value = todos.value.filter((todo) => !deletedIds.has(todo.id))

    if (deletedIds.size === completedIds.length) showToast('success', TODO_CLEARED_MESSAGE)
    else showToast('error', TODO_DELETE_FAILURE_MESSAGE)
  }

  // Drops the previous user's todos on logout
  const resetTodos = () => {
    todos.value = []
    filter.value = TODO_FILTER.ALL
  }

  return {
    todos,
    filter,
    isLoading,
    activeCount,
    completedCount,
    visibleTodos,
    fetchTodos,
    addTodo,
    toggleTodo,
    removeTodo,
    clearCompleted,
    resetTodos,
  }
})
