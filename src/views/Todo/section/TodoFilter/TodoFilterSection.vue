<script setup lang="ts">
import { computed } from 'vue'

import { storeToRefs } from 'pinia'

import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'

import { TODO_FILTER } from '@/enum/global'

import { useAppDataStore } from '@/stores/appData'
import { useTodoStore } from '@/stores/todo'

import FlexStack from '@/components/core/FlexStack/FlexStack.vue'

import * as Languages from './lang'

const { language } = storeToRefs(useAppDataStore())
const todoStore = useTodoStore()
const { todos, filter, activeCount, completedCount } = storeToRefs(todoStore)
const { clearCompleted } = todoStore

const filterCounts = computed<Record<TODO_FILTER, number>>(() => ({
  [TODO_FILTER.ALL]: todos.value.length,
  [TODO_FILTER.ACTIVE]: activeCount.value,
  [TODO_FILTER.COMPLETED]: completedCount.value,
}))
const filterOptions = computed(() =>
  Object.values(TODO_FILTER).map((value) => ({
    label: `${Languages.FILTER_LABEL[value][language.value]} (${filterCounts.value[value]})`,
    value,
  })),
)
</script>

<template>
  <FlexStack class="todo-page__filter-section">
    <SelectButton
      v-model="filter"
      :options="filterOptions"
      :allow-empty="false"
      option-label="label"
      option-value="value"
      size="small"
      class="todo-page__filter-options"
    />
    <Button
      v-if="completedCount > 0"
      :label="Languages.CLEAR_COMPLETED[language]"
      variant="text"
      size="small"
      @click="clearCompleted"
      class="todo-page__filter-clear-button"
    />
  </FlexStack>
</template>

<style scoped>
.todo-page__filter-section {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--app-spacing-4);
}
</style>
