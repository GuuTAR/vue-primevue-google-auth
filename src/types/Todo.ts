export type DisplayTodo = {
  id: string
  title: string
  isCompleted: boolean
  createdAt: string
  updatedAt: string
}

// models.Todo as returned by the backend
export type TodoRecord = {
  id: string
  title: string
  is_completed: boolean
  created_at: string
  updated_at: string
}

// models.TodoCreateRequest
export type InsertTodoInput = {
  title: string
}
