<script setup lang="ts">
import { computed } from 'vue'

import { storeToRefs } from 'pinia'

import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'

import { LANGUAGE } from '@/enum/global'

import { DEFAULT_TIMEZONE } from '@/data/user'

import { useAppDataStore } from '@/stores/appData'
import { useTodoStore } from '@/stores/todo'

import FlexStack from '@/components/core/FlexStack/FlexStack.vue'
import TextVariant from '@/components/core/TextVariant/TextVariant.vue'

import * as Languages from './lang'

const { language } = storeToRefs(useAppDataStore())
const todoStore = useTodoStore()
const { filter, isLoading, visibleTodos } = storeToRefs(todoStore)
const { toggleTodo, removeTodo } = todoStore

const dateFormatter = computed(
  () =>
    new Intl.DateTimeFormat(DATE_LOCALE[language.value], {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: DEFAULT_TIMEZONE,
    }),
)

function formatDate(date: string): string {
  return dateFormatter.value.format(new Date(date))
}

const DATE_LOCALE: Record<LANGUAGE, string> = {
  [LANGUAGE.ENGLISH]: 'en-US',
  [LANGUAGE.THAI]: 'th-TH',
}
</script>

<template>
  <FlexStack class="todo-page__list-section">
    <ul v-if="visibleTodos.length > 0" class="todo-page__list">
      <li v-for="todo in visibleTodos" :key="todo.id" class="todo-page__list-item">
        <Checkbox
          :model-value="todo.isCompleted"
          :input-id="`todo-${todo.id}`"
          :binary="true"
          @update:model-value="toggleTodo(todo.id)"
          class="todo-page__list-item-checkbox"
        />
        <label :for="`todo-${todo.id}`" class="todo-page__list-item-content">
          <TextVariant
            variant="body1"
            :class="[
              'todo-page__list-item-text',
              { 'todo-page__list-item-text--done': todo.isCompleted },
            ]"
          >
            {{ todo.title }}
          </TextVariant>
          <TextVariant variant="caption" class="todo-page__list-item-date">
            {{ formatDate(todo.createdAt) }}
          </TextVariant>
        </label>
        <Button
          :aria-label="Languages.DELETE_TASK[language]"
          icon="pi pi-trash"
          severity="secondary"
          variant="text"
          :rounded="true"
          @click="removeTodo(todo.id)"
          class="todo-page__list-item-delete-button"
        />
      </li>
    </ul>

    <FlexStack v-else-if="isLoading" class="todo-page__list-empty">
      <TextVariant variant="body2" class="todo-page__list-empty-description">
        {{ Languages.LOADING[language] }}
      </TextVariant>
    </FlexStack>

    <FlexStack v-else class="todo-page__list-empty">
      <TextVariant variant="body2" :bold="true" class="todo-page__list-empty-title">
        {{ Languages.EMPTY_TITLE[filter][language] }}
      </TextVariant>
      <TextVariant variant="caption" class="todo-page__list-empty-description">
        {{ Languages.EMPTY_DESCRIPTION[filter][language] }}
      </TextVariant>
    </FlexStack>
  </FlexStack>
</template>

<style scoped>
.todo-page__list-section {
  flex-direction: column;
  overflow: hidden;
  border-radius: 18px;
  background: var(--p-primary-0);
  box-shadow: 0 1px 2px rgb(11 27 59 / 4%);
}

.todo-page__list {
  margin: 0;
  padding: var(--app-spacing-0);
  list-style: none;
}

.todo-page__list-item {
  display: flex;
  align-items: center;
  gap: var(--app-spacing-4);
  padding: var(--app-spacing-1) var(--app-spacing-3) var(--app-spacing-1) var(--app-spacing-5);
}

.todo-page__list-item + .todo-page__list-item {
  border-top: 1px solid var(--p-primary-50);
}

.todo-page__list-item-checkbox {
  flex: none;
}

.todo-page__list-item-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--app-spacing-1);
  min-width: 0;
  padding: var(--app-spacing-2) var(--app-spacing-0);
  cursor: pointer;
}

.todo-page__list-item-text {
  overflow-wrap: anywhere;
}

.todo-page__list-item-text--done {
  color: var(--p-text-muted-color);
  text-decoration: line-through;
}

.todo-page__list-item-date {
  color: var(--p-text-muted-color);
}

.todo-page__list-empty {
  flex-direction: column;
  gap: var(--app-spacing-1);
  padding: var(--app-spacing-5);
}

.todo-page__list-empty-description {
  color: var(--p-text-muted-color);
}
</style>
