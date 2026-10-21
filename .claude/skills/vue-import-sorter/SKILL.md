---
name: vue-import-sorter
description: Sort and group imports in Vue single-file components and TypeScript files using the project's CSS, Vue, Pinia, PrimeVue, and alias conventions. Use when organizing or reviewing imports in .vue <script> blocks or .ts files.
---

# Vue Import Sorter

Sort imports in `.vue` and `.ts` files according to the required group order. Preserve runtime behavior and existing import semantics.

## Scope and safety

- For `.vue` files, modify imports only inside `<script>` or `<script setup>` blocks. Do not change the template, styles, component logic, or move imports between blocks.
- For `.ts` files, sort the file's top-level imports normally.
- Do not reorder code that is not an import.
- Preserve each import's original syntax, imported symbols, quote style, and semicolon style.
- Do not merge or split imports unless necessary to organize them.
- Keep comments attached to their imports. If ownership of a comment is ambiguous, avoid moving it across unrelated imports.
- Within each group, sort alphabetically by module specifier, case-insensitively. If specifiers are identical, preserve their existing order.
- Separate non-empty groups with exactly one blank line. Do not insert blank lines between imports in the same group. Remove excess blank lines within the import block.
- Do not add group-header comments unless the file already has them.

## Required group order

Assign each import to the first matching group below.

1. **CSS side-effect imports** — imports of CSS files, such as `import './styles.css'`, `import '@/assets/main.css'`, or `import 'primevue/resources/primevue.min.css'`. This group is determined by the imported path ending in `.css` (allowing a query suffix if the project uses one), and takes precedence over all other groups.
2. **Vue ecosystem** — imports from `vue`, `vue-router`, and other clearly Vue-related packages such as `@vue/*` or `vue-*`. Do not classify unrelated packages as Vue ecosystem packages just because they integrate with Vue.
3. **Pinia** — imports from `pinia` and clearly Pinia-specific packages.
4. **PrimeVue** — imports from `primevue` and PrimeVue-specific packages, excluding CSS imports already assigned to group 1.
5. **Other external packages** — all remaining package imports from dependencies or package specifiers, including scoped packages, except those assigned to groups 1–4.
6. **Assets alias** — imports beginning with `@/assets/`, excluding CSS imports already assigned to group 1.
7. **Config alias** — imports beginning with `@/config/`.
8. **Router alias** — imports beginning with `@/router/`.
9. **Types and enums aliases** — imports beginning with `@/types/` or `@/enum/`; combine both in one group and alphabetize by full module specifier.
10. **Data alias** — imports beginning with `@/data/`.
11. **Language alias** — imports beginning with `@/lang/`.
12. **Theme alias** — imports beginning with `@/theme/`.
13. **Stores alias** — imports beginning with `@/stores/`.
14. **Composables alias** — imports beginning with `@/composables/`.
15. **Components alias** — imports beginning with `@/components/`.
16. **View section alias** — imports beginning with `@/views/` that clearly point to a page section, such as `@/views/<page>/section`. Sort by full module specifier. Other `@/views/` imports that do not clearly refer to a section belong in group 19.
17. **Languages namespace exception** — exactly `import * as Languages from './lang'`. This is the only permitted relative import. Preserve this exact form.
18. **Absolute-path rule** — all imports must use absolute package specifiers or project aliases. The only permitted relative import is the exact group-17 exception. When another relative import can be confidently mapped to an existing absolute alias, rewrite it to that alias and place it in the appropriate group. Never guess alias mappings or filesystem paths. If the correct absolute path cannot be determined confidently, leave the import unchanged and report it as an unresolved relative import.
19. **Other imports** — all remaining imports not covered by groups 1–17, including unclassified `@/views/` imports and other absolute project aliases. Sort alphabetically by full module specifier.

## Classification rules

- Match alias prefixes as path segments: `@/assets/` matches, but `@/assets-old/` does not.
- CSS imports take precedence over their normal path group. For example, `import '@/assets/main.css'` belongs in group 1, not group 6.
- The exact exception is the namespace import `import * as Languages from './lang'`. Do not extend the exception to `../lang`, `./lang/`, default imports, or named imports.
- For package imports, classify by module specifier, not by imported identifier.
- Do not create empty groups.
- Preserve side-effect import behavior and do not remove imports simply because they appear unused.

## Procedure

1. Locate the import block in the relevant scope.
2. Classify every import according to the first matching group.
3. Enforce the absolute-path rule only when the correct alias can be determined confidently; otherwise report the unresolved relative import.
4. Sort imports alphabetically within each group.
5. Emit groups in the required order, with one blank line between non-empty groups.
6. Review the diff to ensure only imports changed and none were lost, duplicated, or semantically altered.
7. Briefly report any relative imports that could not safely be converted.

## Example

Input:

```ts
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import './app.css'
import { createPinia } from 'pinia'
import * as Languages from './lang'
import Card from 'primevue/card'
import type { User } from '@/types/user'
import logo from '@/assets/logo.svg'
import { appConfig } from '@/config/app'
import { helper } from 'lodash'
import '@/assets/main.css'
```

Output:

```ts
import './app.css'
import '@/assets/main.css'

import { ref } from 'vue'

import { createPinia } from 'pinia'

import Card from 'primevue/card'

import { helper } from 'lodash'

import logo from '@/assets/logo.svg'

import { appConfig } from '@/config/app'

import type { User } from '@/types/user'

import * as Languages from './lang'

import Button from '@/components/Button.vue'
```

Apply the same rules inside `.vue` script blocks.
