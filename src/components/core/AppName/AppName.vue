<script setup lang="ts">
import AppIcon from '@primeicons/vue/check-circle'

import { storeToRefs } from 'pinia'

import { useAppDataStore } from '@/stores/appData'

import Stack from '@/components/core/Stack/Stack.vue'
import Typography from '@/components/core/Typography/Typography.vue'

import * as Languages from './lang'

const { isDescriptionVisible = true } = defineProps<{
  isDescriptionVisible?: boolean
}>()

const { language } = storeToRefs(useAppDataStore())
</script>

<template>
  <Stack class="app-name">
    <Stack class="app-name__icon"><AppIcon :size="20" /></Stack>
    <Stack class="app-name__content">
      <Typography variant="h6" :bold="true" class="app-name__title">{{
        Languages.APP_NAME[language]
      }}</Typography>
      <Typography v-if="isDescriptionVisible" variant="body2" class="app-name__description">
        {{ Languages.APP_DESCRIPTION[language] }}
      </Typography>
    </Stack>
  </Stack>
</template>

<style scoped>
.app-name {
  flex-direction: row;
  align-items: center;
  gap: var(--app-spacing-4);
}

.app-name__icon {
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--p-primary-500);
  color: var(--p-primary-0);
}

.app-name__content {
  flex-direction: column;
  gap: var(--app-spacing-1);
}
</style>
