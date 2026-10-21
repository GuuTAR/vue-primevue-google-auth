<script setup lang="ts">
import { computed, ref } from 'vue'

import { storeToRefs } from 'pinia'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

import { useAppDataStore } from '@/stores/appData'
import { useTodoStore } from '@/stores/todo'

import FlexStack from '@/components/core/FlexStack/FlexStack.vue'

import * as Languages from './lang'

const { language } = storeToRefs(useAppDataStore())
const { addTodo } = useTodoStore()

const draft = ref('')

const isDraftEmpty = computed(() => !draft.value.trim())

function handleAddTodo(): void {
  if (isDraftEmpty.value) return
  addTodo(draft.value.trim())
  draft.value = ''
}
</script>

<template>
  <FlexStack class="todo-page__composer-section">
    <InputText
      v-model="draft"
      :placeholder="Languages.PLACEHOLDER[language]"
      :aria-label="Languages.PLACEHOLDER[language]"
      size="large"
      fluid
      @keydown.enter="handleAddTodo"
      class="todo-page__composer-input"
    />
    <Button
      :label="Languages.ADD[language]"
      :disabled="isDraftEmpty"
      icon="pi pi-plus"
      size="large"
      @click="handleAddTodo"
      class="todo-page__composer-button"
    />
  </FlexStack>
</template>

<style scoped>
.todo-page__composer-section {
  align-items: flex-start;
  gap: var(--app-spacing-3);
}

.todo-page__composer-input {
  flex: 1;
  min-width: 0;
}

.todo-page__composer-button {
  flex: none;
}
</style>
