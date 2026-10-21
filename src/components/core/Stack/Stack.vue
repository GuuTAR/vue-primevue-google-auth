<template>
  <div :class="['stack']">
    <slot />
  </div>
</template>

<style scoped>
.stack {
  display: flex;
}
</style>
