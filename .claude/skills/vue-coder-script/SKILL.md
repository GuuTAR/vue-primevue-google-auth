---
name: vue-coder-script
description: Create and modify the script setup section of Vue 3 pages and components using TypeScript. Organize code into eight ordered groups: imports, props, stores and composables, local refs, computed values, watchers and lifecycle hooks, functions, and other declarations.
---

# Vue Coder Script

## Purpose

Create or modify only the `<script setup lang="ts">` section of Vue 3 Single File Components (`.vue`).

Organize declarations into the eight groups below, in the exact specified order. Separate each non-empty group with exactly one blank line.

## Required Group Order

### 1. Imports

Use the `vue-import-sorter` skill to organize all imports.

Rules:

- Delegate import sorting to `vue-import-sorter` whenever available.
- Keep all imports at the beginning of the script.
- Remove unused imports when safe.
- Do not mix imports with runtime declarations.
- Follow the import grouping and sorting rules defined by `vue-import-sorter`.

### 2. Props

Declare and extract component props using Vue's `defineProps()`.

Rules:

- Place prop declarations and related prop typing immediately after imports.
- Prefer typed props using TypeScript interfaces or type literals.
- Use `withDefaults()` when default values are required and appropriate.
- If individual prop values need to be accessed, follow existing project conventions.
- Do not redeclare props as local state.
- If the component does not accept props, omit this group.

Example:

```ts
interface Props {
  title: string
  initialCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  initialCount: 0,
})
```

If props are not needed, do not create an empty props declaration.

### 3. Stores and Composables

Initialize stores first, then extract the required store values, followed by composables.

Rules:

- Declare store instances before composables.
- Extract store state, getters, and actions before initializing unrelated composables.
- Use `storeToRefs()` when needed to preserve reactivity for Pinia state and getters.
- Actions can usually be destructured directly from the store.
- Do not duplicate state already managed by a store.
- Initialize composables after store declarations and store value extraction.
- Use only stores and composables that exist in the project.

Example:

```ts
const userStore = useUserStore()
const { currentUser, isAuthenticated } = storeToRefs(userStore)
const { logout } = userStore

const { formatDate } = useDateFormatter()
```

If no store or composable is needed, omit this group.

### 4. Local State — `ref()`

Declare component-local reactive state using `ref()`.

Rules:

- Place local `ref()` declarations in this group.
- Include local form values, dialog visibility, selections, and other mutable component state.
- Use appropriate TypeScript types.
- Do not duplicate props or store-managed state.
- Do not place derived values in this group.

Example:

```ts
const searchQuery = ref('')
const isDialogOpen = ref(false)
const selectedUserId = ref<string | null>(null)
```

### 5. Computed Values — `computed()`

Declare derived reactive values using `computed()`.

Rules:

- Place all `computed()` declarations after local state.
- Derive values from props, stores, local state, or other reactive sources.
- Keep computed getters pure and avoid side effects.
- Prefer computed values over duplicated derived state.
- Ensure dependencies are declared before they are used.

Example:

```ts
const filteredUsers = computed(() =>
  users.value.filter((user) => user.name.toLowerCase().includes(searchQuery.value.toLowerCase())),
)
```

### 6. Watchers and Lifecycle Hooks

Place the following declarations in this group:

- `watch()`
- `watchEffect()`
- `onMounted()`
- `onUpdated()`
- `onUnmounted()`
- Other applicable Vue lifecycle hooks

Rules:

- Place watchers and lifecycle hooks after computed values and before functions.
- Keep related reactive effects together.
- Avoid unnecessary watchers when computed values or event handlers are sufficient.
- Clean up listeners, subscriptions, timers, and other resources when appropriate.
- Do not introduce unnecessary side effects.

Example:

```ts
watch(searchQuery, (query) => {
  if (query.trim()) {
    void fetchUsers(query)
  }
})

onMounted(() => {
  initializeComponent()
})

onUnmounted(() => {
  cleanupComponent()
})
```

Functions declared later may be referenced by these hooks when declaration and initialization semantics allow it. Avoid accessing a `const` function before initialization.

### 7. Functions

Declare functions, event handlers, and business logic after watchers and lifecycle hooks.

Rules:

- Include event handlers, API operations, validation, transformations, and other component behavior.
- Use descriptive names.
- Add appropriate parameter and return types.
- Keep each function focused on a single responsibility.
- Follow the project's asynchronous error-handling conventions.
- Do not place substantial business logic directly in template expressions.
- Do not invent API endpoints, service methods, or store actions.

Example:

```ts
async function fetchUsers(query: string): Promise<void> {
  // Use the actual service or API defined in the project.
}

function handleUserSelection(userId: string): void {
  selectedUserId.value = userId
}
```

### 8. Other Declarations

Place declarations that do not fit any preceding group here, at the end of the script.

Examples:

- Static constants and configuration values
- Non-reactive lookup data
- Standalone utility declarations
- Type guards and other supporting declarations

Rules:

- Do not move imports, props, stores, composables, local refs, computed values, watchers, lifecycle hooks, or primary event handlers into this group.
- Keep this group minimal.
- Omit it when no additional declarations are necessary.

## Formatting Rules

- Use Vue 3 Composition API and TypeScript.
- Generate code for `<script setup lang="ts">`.
- Follow the eight-group order exactly.
- Separate every non-empty group with exactly one blank line.
- Do not insert group-heading comments unless explicitly requested.
- Do not add blank lines between every declaration.
- Keep declarations within each group logically organized.
- Follow the project's naming, typing, and formatting conventions.
- Do not modify `<template>` or `<style scoped>` unless explicitly requested.

## Example Output

```vue
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useDateFormatter } from '@/composables/useDateFormatter'

interface Props {
  title: string
  initialCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  initialCount: 0,
})

const userStore = useUserStore()
const { users, isLoading } = storeToRefs(userStore)
const { fetchUsers } = userStore
const { formatDate } = useDateFormatter()

const searchQuery = ref('')
const selectedUserId = ref<string | null>(null)

const filteredUsers = computed(() =>
  users.value.filter((user) => user.name.toLowerCase().includes(searchQuery.value.toLowerCase())),
)

watch(searchQuery, (query) => {
  if (query.trim()) {
    void fetchUsers(query)
  }
})

onMounted(() => {
  // Perform required initialization.
})

function handleUserSelection(userId: string): void {
  selectedUserId.value = userId
}

const PAGE_SIZE = 20
</script>
```

The example illustrates the group order. Only include declarations needed by the actual component and supported by the project.

## Final Validation Checklist

Before returning the script:

- [ ] Imports are organized by `vue-import-sorter` when available.
- [ ] Props appear immediately after imports.
- [ ] Store instances and extracted store values appear before composables.
- [ ] Local `ref()` declarations appear before computed values.
- [ ] Computed values appear before watchers and lifecycle hooks.
- [ ] Watchers and lifecycle hooks appear before functions.
- [ ] Functions appear before other declarations.
- [ ] Each non-empty group is separated by exactly one blank line.
- [ ] All referenced identifiers and types are valid.
- [ ] No unnecessary duplicate state, unused imports, or invented APIs remain.
- [ ] Only the script section has been created or modified.
