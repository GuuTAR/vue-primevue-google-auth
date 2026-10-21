---
name: vue-coder-style
description: Create and modify scoped CSS styles for Vue 3 pages and components. Inspect /claude-design and the component template first. Follow app spacing tokens, PrimeVue theme colors, Stack layout rules, and max-width-only media query breakpoints.
---

# Vue Coder Style

## Purpose

Create or modify only the `<style scoped>` section of Vue 3 Single File Components (`.vue`).

Follow the design system in `/claude-design`, the actual class names in the component's `<template>`, and the project's existing theme and CSS conventions.

## 1. Inspect Design First

Before writing CSS, inspect `/claude-design`.

Review relevant design references, including:

- Color palette and semantic color usage
- Typography and text hierarchy
- Spacing and sizing tokens
- Component and page layouts
- Responsive design and breakpoints
- Borders, shadows, radii, and interaction states
- Existing theme configuration and reusable style patterns

Rules:

- Treat `/claude-design` as the primary design reference.
- Reuse established visual patterns and tokens.
- Do not invent a separate design system when one already exists.
- If the design directory is unavailable, inspect existing styles and theme configuration.
- Do not claim to have inspected files that are inaccessible.
- Do not modify `/claude-design` unless explicitly requested.

## 2. Inspect the Template Classes

Read the component's `<template>` before writing styles.

Rules:

- Use the actual class names defined in the template.
- Do not invent class names that are not present in the template.
- If a new class is required, coordinate with `vue-coder-template` so the template and styles remain consistent.
- Prefer styling existing project components through supported props, slots, and documented CSS customization APIs.
- Do not assume scoped styles can directly target internal elements of child components.
- Avoid unnecessary deep selectors and global selectors.

For page components, follow the page namespace convention, such as `login-page__form-section`.

For reusable components, follow the component namespace convention, such as `user-card__header`.

## 3. Scoped Style Requirements

Generate styles inside:

```vue
<style scoped>
/* Component-local CSS */
</style>
```

Rules:

- Keep component-specific styling scoped.
- Do not add a second `<style>` block.
- Do not introduce global CSS rules unless explicitly required and supported by the project's architecture.
- Do not duplicate styles already provided by PrimeVue, shared components, or the design system.
- Prefer existing CSS variables and theme tokens over hard-coded values.

## 4. Stack Layout Rules

Do NOT use `display: flex` for `Stack`.

Rules:

- When styling a template whose root or layout wrapper is `<Stack>`, do not declare `display: flex` on that `Stack` element.
- Inspect the existing `Stack` implementation to understand how its layout is controlled.
- Use the `Stack` component's existing props and layout behavior.
- If a different nested element genuinely requires flexbox, flexbox may be used on that element, provided it is not the `Stack` itself.
- Do not override the layout behavior of `Stack` with conflicting CSS.

Example:

```vue
<template>
  <Stack class="user-card">
    <div class="user-card__header">
      <!-- Content -->
    </div>
  </Stack>
</template>

<style scoped>
.user-card {
  padding: var(--app-spacing-4);
}

.user-card__header {
  display: flex;
  align-items: center;
  gap: var(--app-spacing-2);
}
</style>
```

The nested element is illustrative. Follow the actual component structure and design requirements.

## 5. Spacing Tokens

All CSS `gap` and `padding` declarations MUST use the application's spacing tokens.

Required format:

`var(--app-spacing-{number})`

Examples:

```css
.example {
  gap: var(--app-spacing-2);
  padding: var(--app-spacing-4);
  padding-inline: var(--app-spacing-3);
  padding-block: var(--app-spacing-2);
}
```

Rules:

- Use spacing tokens for `gap`, `row-gap`, `column-gap`, `padding`, `padding-top`, `padding-right`, `padding-bottom`, `padding-left`, and logical padding properties.
- Do not use raw pixel, rem, em, or percentage values for padding or gap.
- Inspect `/claude-design` and the project theme to identify valid token numbers.
- Do not assume every token number exists.
- Choose the nearest available token that satisfies the design.
- Do not add arbitrary spacing tokens without an explicit theme change.
- If a required spacing token is missing, report the missing token instead of silently inventing it.

Margins and other layout properties should follow the existing design system. Use its spacing tokens when applicable.

## 6. Color and Background Tokens

Use PrimeVue primary palette variables for CSS `color` and `background` declarations.

Required format:

`var(--p-primary-{number})`

Examples:

```css
.example {
  color: var(--p-primary-700);
  background: var(--p-primary-50);
}
```

Rules:

- Use `var(--p-primary-{number})` for `color` and `background` when the token is appropriate for the intended visual role.
- Inspect the existing PrimeVue theme to determine which primary shade numbers are available.
- Do not assume all numeric shades exist.
- Do not use arbitrary hex, RGB, HSL, or named colors for these properties when an appropriate theme token exists.
- Reuse the established color hierarchy in `/claude-design`.
- Do not use a primary color for a semantic purpose where it would produce the wrong visual meaning or accessibility contrast.

### When the Primary Palette Is Not Appropriate

If no existing primary shade adequately represents the required color:

1. Inspect the theme configuration and available semantic tokens.
2. Determine whether an existing semantic or neutral token is suitable and consistent with the design.
3. If no suitable token exists, identify the additional theme color required.
4. Prefer defining the new token in the theme configuration instead of hard-coding a color inside the component.
5. Use the new token in the component only after its intended name and definition are established.

At the end of the response, summarize:

- The missing color or shade.
- Why the existing primary palette is insufficient.
- The proposed token name and intended use.
- The theme configuration that needs updating, if known.

Do not claim that a theme token has been added unless the theme was actually modified and verified.

## 7. Other Visual Properties

For typography, dimensions, borders, radii, shadows, and transitions:

- Follow `/claude-design` and the existing project theme.
- Reuse typography tokens and shared CSS variables when available.
- Avoid arbitrary magic numbers when design tokens exist.
- Use sensible `min-width`, `max-width`, and `box-sizing` rules where appropriate.
- Avoid unnecessary overrides of PrimeVue component styling.
- Preserve visible focus states and disabled states.
- Ensure text remains readable and layout does not overflow.

The spacing-token restriction for `gap` and `padding`, and the color-token restriction for `color` and `background`, remain mandatory regardless of the property group.

## 8. Responsive Breakpoints

All responsive `@media` queries MUST use `max-width` breakpoints.

Correct example:

```css
@media (max-width: 768px) {
  .login-page__form-section {
    width: 100%;
  }
}
```

Rules:

- Use `@media (max-width: ...)` for responsive layout changes.
- Do not use `@media (min-width: ...)`.
- Do not use range syntax such as `(width >= 768px)` or `(768px <= width)`.
- Inspect `/claude-design` and the project configuration for established breakpoint values.
- Reuse the existing breakpoint values rather than inventing new ones.
- Do not add media queries when the layout already responds correctly without them.
- Keep responsive rules inside the same `<style scoped>` section unless the project explicitly requires otherwise.

## 9. Selector and Layout Quality

- Prefer simple class selectors matching the template.
- Avoid unnecessary selector nesting and excessive specificity.
- Do not use `display: flex` on `Stack`.
- Use grid, block layout, or existing component layout behavior when appropriate.
- Flexbox may be used on nested non-Stack elements when needed.
- Avoid styling elements through fragile positional selectors when a class can be used.
- Do not introduce `!important` unless required by a documented project convention.
- Ensure hover, focus, active, and disabled states match the design.

## 10. Final Validation

Before returning the styles, verify:

- [ ] `/claude-design` was inspected when accessible.
- [ ] The template was inspected and all selectors match actual class names.
- [ ] Styles are inside `<style scoped>`.
- [ ] No `display: flex` declaration targets a `Stack` element.
- [ ] All `gap` and `padding` declarations use valid `var(--app-spacing-{number})` tokens.
- [ ] `color` and `background` use appropriate `var(--p-primary-{number})` tokens where suitable.
- [ ] Missing colors are reported with proposed theme tokens.
- [ ] Every responsive media query uses `max-width`.
- [ ] Existing design tokens and PrimeVue styles are reused.
- [ ] No unnecessary global selectors, arbitrary colors, or unsupported tokens remain.
- [ ] Only the style section has been created or modified.

## 11. Output Rules

When working in a repository:

- Update only the requested component's style section.
- If a required theme color is missing, update the theme only when authorized and when the correct theme location is known.
- Otherwise, report the proposed theme addition without claiming it was implemented.
- Summarize any required theme changes after the code.

When working without repository access:

- Return the complete `<style scoped>` section.
- State any assumptions about unavailable design references or tokens.
- Explicitly identify any missing theme colors that need to be added.
