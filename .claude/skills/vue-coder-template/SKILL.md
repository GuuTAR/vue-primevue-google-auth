---
name: vue-coder-template
description: Create Vue 3 page and component templates using the existing design system in /claude-design. Reuse PrimeVue and project components, organize page sections and reusable components, use lang.ts for localization, and enforce consistent attribute ordering and class naming.
---

# Vue Coder Template

## Purpose

Create or modify only the `<template>` section of Vue 3 Single File Components (`.vue`).

Follow the existing project architecture, design system, component library, localization conventions, and template formatting rules.

## 1. Inspect Design First

Before writing any template, inspect `/claude-design`.

Treat `/claude-design` as the primary source of truth for visual design and UI conventions.

Review relevant design documentation and assets, including when available:

- Design principles and visual guidelines
- Layouts, spacing, and responsive breakpoints
- Typography and color tokens
- Component patterns and interaction states
- Page layouts and navigation
- Existing UI examples and reusable design patterns

Rules:

- Reuse established design patterns rather than inventing a new design.
- Follow the documented design system for spacing, hierarchy, sizing, colors, and component composition.
- Check whether a similar page or component already exists in the design references.
- If `/claude-design` is missing or does not contain relevant guidance, inspect the existing project and follow its established conventions.
- Do not claim to have inspected design references that are inaccessible.
- Do not modify `/claude-design` unless explicitly requested.

## 2. Root Element

### Pages

A page template MUST start with `<main>`.

```vue
<template>
  <main class="login-page">
    <!-- Page content -->
  </main>
</template>
```

Rules:

- Use one semantic `<main>` root for the page's primary content.
- Do not add another `<main>` inside page sections.
- Use semantic elements such as `<header>` and `<section>` where appropriate.
- The root class must follow the `<page-name>-page` convention.

### Components

A reusable component MUST start with `<Stack>`.

```vue
<template>
  <Stack class="user-card">
    <!-- Component content -->
  </Stack>
</template>
```

Rules:

- Reuse the project's existing `Stack` component.
- Inspect its API before using its props.
- Do not invent unsupported props.
- If `Stack` is unavailable, inspect the project and report the missing dependency rather than silently substituting another root element.

## 3. Prefer Existing Components

Maximize reuse of existing components.

Priority order:

1. Existing project components under `/components`.
2. Existing PrimeVue components.
3. Existing shared layout and utility components.
4. Native HTML elements when no suitable component exists.

Before creating new markup:

- Inspect existing component implementations and usage examples.
- Check component props, events, slots, and styling conventions.
- Reuse buttons, inputs, dialogs, tables, menus, cards, and layout components where appropriate.
- Avoid duplicating existing behavior.
- Follow the design patterns in `/claude-design`.
- Do not introduce another UI library without a clear requirement.

Do not force a component-library abstraction when semantic HTML is more appropriate.

## 4. Organize Page Sections

Separate substantial page-specific sections into a `section` folder belonging to that page.

Example:

```text
src/
├── pages/
│   └── login/
│       ├── LoginPage.vue
│       └── section/
│           ├── LoginHeaderSection.vue
│           └── LoginFormSection.vue
└── components/
    └── ...
```

Adapt the exact paths to the project's existing directory structure.

Rules:

- Keep the page template focused on composing sections.
- Extract logically distinct page regions into components under that page's `section` directory.
- Follow `/claude-design` when deciding section boundaries and page composition.
- Avoid splitting trivial markup into excessive components.
- Use existing components instead of creating duplicates.
- Import and compose section components using the project's conventions.

## 5. Extract Reusable Components

When a page contains a component that is likely to be reused, create or reuse a component under `/components`.

Use `/components` for UI that:

- Has a clear responsibility independent of one page.
- Is likely to appear on multiple pages.
- Encapsulates a reusable interaction or visual pattern.
- Would otherwise cause duplicated markup.

Use the page's `section` folder for UI that:

- Represents a specific region of one page.
- Is tightly coupled to that page's context.
- Is unlikely to be reused elsewhere.

Before creating a component, check whether an equivalent component already exists.

When creating a new component is necessary, keep its API and design consistent with `/claude-design`.

## 6. Localization Using `lang.ts`

All user-facing text must follow the project's localization system.

Rules:

- Locate and inspect `lang.ts`.
- Identify the actual exported translation object, composable, or function.
- Use the existing localization API and translation keys.
- Reuse existing keys whenever possible.
- If a key is missing, follow the project's conventions for defining and adding it.
- Do not invent translation APIs or assume a specific localization library.
- Avoid hard-coded user-facing text unless explicitly required.

Illustrative example only:

```vue
<template>
  <main class="login-page">
    <h1>{{ lang.login.title }}</h1>
  </main>
</template>
```

Use the actual access pattern defined by the project.

## 7. Attribute Ordering

Attributes must follow a consistent left-to-right order.

Rules:

1. If present, place `v-if`, `v-else-if`, or `v-else` first.
2. Place other directives and attributes after the conditional directive.
3. Keep `class` as the final attribute, always.
4. Preserve the correct pairing and behavior of conditional directives.

Example:

```vue
<template>
  <Button
    v-if="canSubmit"
    type="submit"
    :disabled="isSubmitting"
    :label="lang.login.submit"
    class="login-page__submit-button"
  />
</template>
```

For elements without conditional directives, begin with the applicable attributes and still place `class` last.

Additional rules:

- Keep attributes on separate lines for multiline elements.
- Do not place `class` before any other attribute.
- Apply the same ordering to native elements, `Stack`, and PrimeVue components.
- Do not reorder attributes in a way that changes directive behavior.

## 8. Static and Dynamic Attributes

Use `:` for every non-string-literal attribute value.

### Static string literals

```vue
<Button label="Save" class="save-button" />
```

### Dynamic values

```vue
<Button
  :label="lang.common.save"
  :disabled="isSubmitting"
  :loading="isLoading"
  :tabindex="0"
  :items="menuItems"
  class="toolbar__save-button"
/>
```

Rules:

- Use `:prop="expression"` for variables, expressions, booleans, numbers, objects, arrays, and other dynamic values.
- Do not write `disabled="isDisabled"` when the intention is to bind a variable.
- Write `:disabled="isDisabled"` instead.
- Static boolean attributes may remain unbound when their presence is intentional, such as `required`.
- Dynamic boolean attributes must use `:`, for example `:required="isRequired"`.
- Use `@event` syntax for event listeners.
- Do not add unnecessary bindings to static string literals.

## 9. Class Naming

### Pages

The root page class must end in `-page`.

Examples:

- `login-page`
- `dashboard-page`
- `user-settings-page`

All page-specific sections and elements must use the page class as their namespace, with `__` separating the section or element name.

Examples:

```text
login-page
login-page__header
login-page__form-section
login-page__form-section-title
login-page__submit-button
```

Rules:

- Use lowercase kebab-case.
- Prefix page-specific classes with the page namespace.
- Use `__` for sections, components, and nested elements.
- Avoid generic unnamespaced classes for page-specific markup.

### Components Under `/components`

Use the component's name as the base class.

For example, `UserCard.vue`:

```text
user-card
user-card__header
user-card__title
user-card__content
```

Rules:

- Use lowercase kebab-case.
- Keep the class namespace consistent with the component filename.
- Use `__` for internal sections and elements.
- Do not append `-page` to reusable component names.

### Page Section Components

Sections in a page's `section` folder must use the parent page's namespace.

Example:

```text
login-page__header-section
login-page__header-section-title
```

Follow any more specific naming rules documented in `/claude-design` when they do not conflict with these explicit requirements.

## 10. Accessibility and Semantics

- Use semantic HTML elements where appropriate.
- Provide accessible labels for inputs and controls.
- Give interactive controls meaningful accessible names.
- Use buttons for actions and links for navigation.
- Ensure interactive elements follow appropriate keyboard-accessibility patterns.
- Avoid unnecessary wrapper elements.
- Follow the interaction and accessibility patterns defined in `/claude-design`.

## 11. Template Boundaries

- Generate only the `<template>` section.
- Do not place TypeScript declarations or business logic inside the template.
- Reference identifiers supplied by the script section.
- Do not invent props, event handlers, routes, component APIs, or translation keys.
- Coordinate with `vue-coder-script` if required identifiers are missing.
- Keep complex logic in script functions and computed values.
- Use stable `:key` values for `v-for`.
- Ensure conditional directives are valid and correctly paired.

## 12. Final Validation

Before returning the template, verify:

- [ ] `/claude-design` was inspected when accessible.
- [ ] The template follows the established design system.
- [ ] Pages start with `<main>`.
- [ ] Components start with `<Stack>`.
- [ ] Existing `/components` and PrimeVue components are reused where appropriate.
- [ ] Page-specific sections are organized under the page's `section` folder when warranted.
- [ ] Reusable components are created or reused under `/components`.
- [ ] User-facing text follows `lang.ts`.
- [ ] Conditional directives appear first when present.
- [ ] `class` is always the final attribute.
- [ ] Dynamic non-string values use `:` bindings.
- [ ] Class names follow the required page and component conventions.
- [ ] Script identifiers and component APIs are valid.
- [ ] Accessibility and semantic structure are preserved.
- [ ] Only the template section has been created or modified.
