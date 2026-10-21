<script setup lang="ts">
import { storeToRefs } from 'pinia'

import AppIcon from '@primeicons/vue/check-circle'

import { useAppDataStore } from '@/stores/appData'

import FlexStack from '@/components/core/FlexStack/FlexStack.vue'
import TextVariant from '@/components/core/TextVariant/TextVariant.vue'

import * as Languages from './lang'

const { isDescriptionVisible = true } = defineProps<{
  isDescriptionVisible?: boolean
}>()

const { language } = storeToRefs(useAppDataStore())
</script>

<template>
  <FlexStack class="app-name">
    <FlexStack class="app-name__icon"><AppIcon :size="20" /></FlexStack>
    <FlexStack class="app-name__content">
      <TextVariant variant="h6" :bold="true" class="app-name__title">{{
        Languages.APP_NAME[language]
      }}</TextVariant>
      <TextVariant v-if="isDescriptionVisible" variant="body2" class="app-name__description">
        {{ Languages.APP_DESCRIPTION[language] }}
      </TextVariant>
    </FlexStack>
  </FlexStack>
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
