---
name: vue-coder
description: Create and modify Vue 3 pages and reusable components in .vue files. Delegate script, template, and scoped styles to vue-coder-script, vue-coder-template, and vue-coder-style respectively.
---

# Vue Coder

## Purpose

Create and modify Vue 3 Single File Components (SFCs) for pages and reusable components.

This skill is an orchestrator. It delegates the implementation of each section to its corresponding specialized skill, then integrates and validates the resulting `.vue` file.

## Required File Structure

Every generated `.vue` file MUST contain exactly three top-level sections in this order:

1. `<script setup lang="ts">`
2. `<template>`
3. `<style scoped>`

Use the following structure:

```vue
<script setup lang="ts">
// Implemented by vue-coder-script
</script>

<template>
  <!-- Implemented by vue-coder-template -->
</template>

<style scoped>
/* Implemented by vue-coder-style */
</style>
```

Do not add additional top-level `<script>`, `<template>`, or `<style>` sections.

## Required Workflow

### Step 1: Understand the Requirements

Identify:

- Whether the requested file is a page or reusable component.
- Its responsibilities and expected behavior.
- Required props, emitted events, data, and interactions.
- Layout, responsive behavior, and visual requirements.
- Existing project conventions and dependencies.

Inspect the repository when available. Reuse existing components, composables, stores, types, routes, UI libraries, and design tokens.

### Step 2: Delegate the Script Section

Use the `vue-coder-script` skill to create the contents of:

`<script setup lang="ts">`

Provide that skill with the relevant requirements, component responsibilities, existing project context, and any known interfaces.

The script section is responsible for TypeScript logic, imports, props, emits, reactive state, computed values, lifecycle hooks, API calls, and event handlers.

### Step 3: Delegate the Template Section

Use the `vue-coder-template` skill to create the contents of:

`<template>`

Provide that skill with the UI requirements, the script's exposed identifiers, available components, and the expected loading, empty, error, and success states.

The template section is responsible for semantic markup, layout, component composition, Vue directives, event bindings, and accessibility.

### Step 4: Delegate the Style Section

Use the `vue-coder-style` skill to create the contents of:

`<style scoped>`

Provide that skill with the layout requirements, existing design tokens, relevant template structure, and responsive behavior.

The style section is responsible for component-local layout, spacing, typography, colors, borders, responsive styling, and interaction states.

### Step 5: Integrate the Sections

Combine the outputs from all three skills into one valid `.vue` file.

Preserve the required section order:

1. Script
2. Template
3. Scoped style

Do not place the implementation of one section inside another section.

### Step 6: Validate the Component

Before finishing, verify that:

- Exactly three sections exist in the required order.
- The script uses `<script setup lang="ts">`.
- The style section uses `<style scoped>`.
- Every template identifier is defined in the script or is a valid Vue template global or component.
- Props and emitted events are consistent between the script and template.
- Event handlers and user interactions are wired correctly.
- TypeScript types and imports are consistent with the project.
- Existing project conventions and UI libraries are respected.
- No unnecessary dependencies, invented API endpoints, or placeholder implementations are introduced.
- Styling is component-scoped and responsive where appropriate.

Fix any integration issues before returning the file.

## Delegation Rules

- Always use `vue-coder-script` for the script section when the skill is available.
- Always use `vue-coder-template` for the template section when the skill is available.
- Always use `vue-coder-style` for the style section when the skill is available.
- Do not replace these skills with similarly named skills.
- If a required skill is unavailable, implement only the affected section using the rules in this document and the existing project conventions. Do not claim that the unavailable skill was invoked.
- Pass relevant context between sections so their interfaces remain consistent.
- Do not delegate the entire `.vue` file to a single specialized skill; each skill is responsible for its designated section.

## Output Rules

When working in a repository:

- Create or update the requested `.vue` file at the appropriate project path.
- Preserve unrelated existing code and avoid unnecessary refactoring.
- Report the file path and any relevant assumptions.

When working without repository access:

- Return the complete `.vue` file in one code block.
- Mention any assumptions or missing project context that affects integration.
- Never claim that tests or builds passed unless they were actually executed.
