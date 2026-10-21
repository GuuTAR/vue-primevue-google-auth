<script setup lang="ts">
import { computed } from 'vue'

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption'

const { variant = 'body1', bold = false } = defineProps<{
  variant?: TypographyVariant
  bold?: boolean
}>()

const VARIANT_TAG: Record<TypographyVariant, string> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
}

const tag = computed(() => VARIANT_TAG[variant])
</script>

<template>
  <component
    :is="tag"
    :class="['typography-root', `typography--${variant}`, { 'typography--bold': bold }]"
  >
    <slot />
  </component>
</template>

<style scoped>
.typography-root {
  margin: 0;
  color: inherit;
}

.typography--h1,
.typography--h2 {
  font-weight: 300;
}

.typography--h1 {
  font-size: 60px;
  line-height: 1.167;
  letter-spacing: -0.01562em;
}

.typography--h2 {
  font-size: 48px;
  line-height: 1.2;
  letter-spacing: -0.00833em;
}

.typography--h3,
.typography--h4,
.typography--h5 {
  font-weight: 400;
}

.typography--h3 {
  font-size: 40px;
  line-height: 1.167;
  letter-spacing: 0em;
}

.typography--h4 {
  font-size: 32px;
  line-height: 1.235;
  letter-spacing: 0.00735em;
}

.typography--h5 {
  font-size: 24px;
  line-height: 1.334;
  letter-spacing: 0em;
}

.typography--h6 {
  font-size: 20px;
  line-height: 1.6;
  font-weight: 500;
  letter-spacing: 0.0075em;
}

.typography--body1,
.typography--body2,
.typography--caption {
  font-weight: 400;
}

.typography--body1 {
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.00938em;
}

.typography--body2 {
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: 0.01071em;
}

.typography--caption {
  font-size: 12px;
  line-height: 1.66;
  letter-spacing: 0.03333em;
}

.typography--bold {
  font-weight: 700;
}
</style>
