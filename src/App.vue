<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import Toast from 'primevue/toast'

import AppMenu from '@/components/common/AppMenu/AppMenu.vue'

const route = useRoute()
const isShowMenu = computed(() => route.meta.showMenu)
</script>

<template>
  <Toast position="top-right" />

  <RouterView v-if="!isShowMenu" class="layout-without-menu" />
  <AppMenu v-else>
    <RouterView />
  </AppMenu>
</template>
