<script setup lang="ts">
import { onMounted } from 'vue'

import { storeToRefs } from 'pinia'

import { useAppDataStore } from '@/stores/appData'
import { useTodoStore } from '@/stores/todo'

import FlexStack from '@/components/core/FlexStack/FlexStack.vue'
import TextVariant from '@/components/core/TextVariant/TextVariant.vue'

import TodoComposerSection from '@/views/Todo/section/TodoComposer/TodoComposerSection.vue'
import TodoFilterSection from '@/views/Todo/section/TodoFilter/TodoFilterSection.vue'
import TodoListSection from '@/views/Todo/section/TodoList/TodoListSection.vue'

import * as Languages from './lang'

const { language } = storeToRefs(useAppDataStore())
const { fetchTodos } = useTodoStore()

onMounted(() => {
  fetchTodos()
})
</script>

<template>
  <main class="todo-page">
    <FlexStack class="todo-page__content">
      <header class="todo-page__header">
        <TextVariant variant="h5" :bold="true" class="todo-page__title">
          {{ Languages.TITLE[language] }}
        </TextVariant>
        <TextVariant variant="body2" class="todo-page__greeting">
          {{ Languages.GREETING[language] }}
        </TextVariant>
      </header>

      <TodoComposerSection />
      <TodoFilterSection />
      <TodoListSection />
    </FlexStack>
  </main>
</template>

<style scoped>
.todo-page {
  padding: var(--app-spacing-6);
}

.todo-page__content {
  flex-direction: column;
  gap: var(--app-spacing-4);
  max-width: var(--content-max-width);
  margin: 0 auto;
}

.todo-page__greeting {
  color: var(--p-text-muted-color);
}

@media (max-width: 600px) {
  .todo-page {
    padding: var(--app-spacing-4);
  }
}
</style>
