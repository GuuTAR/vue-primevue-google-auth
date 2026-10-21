# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

- vue v3
- vue router
- pinia
- primevue
- primeicons
- firebase
- dayjs
- axios

## Commands

### Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
yarn build

# Runs the end-to-end tests
yarn test:e2e
# Runs the tests only on Chromium
yarn test:e2e --project=chromium
# Runs the tests of a specific file
yarn test:e2e tests/example.spec.ts
# Runs the tests in debug mode
yarn test:e2e --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

## Project Structure

The project follows a layered architecture:

```
claude_design/          # Claude Design
src/
  assets                # Store image, global css and svg icon
  components/           # Store reusable components
    common/             # Common reusable components specific only this project
      {component}/      # Component name
        {component}.vue # Component file
        lang.ts         # Component lang data
    core/               # Core reusable components able to use in other project
        {component}.vue # Component file
        lang.ts         # Component lang data
  composables/          # Reusable logic with vue composable
  config/               # Project configuration
  data/                 # Project constant data
  enum/                 # Project enum
  lang/                 # Project lang data for util function, composable, ect. exclude components and pages
  router/               # Vue router
  stores/               # Project global store
  theme/                # Global theme file
  types/                # Type file
  views/                # Page component
    {page}/             # Page name
      section/
        {section}/      # Section name
          {component}.vue # Section Component file
          lang.ts         # Section Component lang data
      {page}.vue        # Page Component file
      enum.ts           # Page enum
      lang.ts           # Page lang data
```

## Claude Skills

1. vue-import-sorter - use everytime for code formatting to ensure that import sorted orderly
2. vue-coder - use when create new components or new pages

## Commits and PR

1. use "vue-import-sorter" before commits
2. remove unused import and never read var

## CI

GitHub Actions workflow: `.github/workflows/pr-build-check.yml`

Triggers on PRs targeting `main` or `dev`. Runs in order:

1. **Lint** — `yarn lint`
2. **Type Check** — `yarn tsc --noEmit`
3. **Build** — `yarn build`

All three must pass before a PR can be merged.

## Don't allow

1. Do not read/write .env file
2. Do not read/write file outside project
