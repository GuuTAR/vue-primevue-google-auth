<template>
  <div :class="['stack-root']">
    <slot />
  </div>
</template>

<style scoped>
.stack-root {
  display: flex;
}
</style>
