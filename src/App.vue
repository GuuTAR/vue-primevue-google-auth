<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'

import Toast from 'primevue/toast'

const route = useRoute()
const isShowMenu = computed(() => route.meta.showMenu)
</script>

<template>
  <Toast position="top-center" />

  <RouterView v-if="!isShowMenu" class="layout-without-menu" />
  <div v-else class="layout-with-menu">
    <RouterView />
  </div>
</template>
