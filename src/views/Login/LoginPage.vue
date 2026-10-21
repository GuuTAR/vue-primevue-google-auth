<script setup lang="ts">
import Button from 'primevue/button'
import Divider from 'primevue/divider'

import googleIcon from '@/assets/google.svg'

import { DEFAULT_LANGUAGE } from '@/data/user'

import { useBreakpoint } from '@/composables/useBreakpoint'
import { useLoginPage } from '@/composables/useLoginPage'

import AppName from '@/components/core/AppName/AppName.vue'
import Stack from '@/components/core/Stack/Stack.vue'
import Typography from '@/components/core/Typography/Typography.vue'

import * as Languages from './lang'

const { isDesktop } = useBreakpoint()
const { loginGoogle, loginDemo } = useLoginPage()
</script>

<template>
  <main class="login-page">
    <Stack v-if="isDesktop" class="login-page__hero">
      <Typography variant="body1" class="login-page__overline">{{
        Languages.SHORT_SUMMARY[DEFAULT_LANGUAGE]
      }}</Typography>
      <Typography variant="h1" class="login-page__title">
        {{ Languages.WELCOME_MESSAGE[DEFAULT_LANGUAGE] }}
      </Typography>
      <Typography variant="body1" class="login-page__body">{{
        Languages.DESCRIPTION[DEFAULT_LANGUAGE]
      }}</Typography>
    </Stack>

    <Stack class="login-page__panel">
      <Stack class="login-page__form">
        <Stack class="login-page__heading">
          <AppName :is-description-visible="false" />
          <Typography variant="h4" :bold="true" class="login-page__sign-in">
            {{ Languages.SIGN_IN[DEFAULT_LANGUAGE] }}
          </Typography>
        </Stack>

        <Button variant="outlined" fluid @click="loginGoogle" class="login-page__google">
          <img :src="googleIcon" width="24" height="24" alt="" />
          <span>{{ Languages.CONTINUE_WITH_GOOGLE[DEFAULT_LANGUAGE] }}</span>
        </Button>

        <Divider align="center" class="login-page__divider">{{
          Languages.OR[DEFAULT_LANGUAGE]
        }}</Divider>

        <Button
          :label="Languages.PLAY_AS_DEMO_USER[DEFAULT_LANGUAGE]"
          icon="pi pi-play"
          fluid
          @click="loginDemo"
        />
      </Stack>
    </Stack>
  </main>
</template>

<style scoped>
.login-page {
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  min-height: 100vh;
}

@media (max-width: 900px) {
  .login-page {
    grid-template-columns: 1fr;
  }
}

.login-page__hero {
  flex-direction: column;
  justify-content: center;
  gap: var(--app-spacing-4);
  padding: 0px var(--app-spacing-16);
  background: linear-gradient(155deg, #2d7ff9 0%, #1b5fd6 55%, #0f4fcb 100%);
  color: #ffffff;
}

.login-page__overline {
  text-transform: uppercase;
  letter-spacing: 2px;
}

.login-page__panel {
  align-items: center;
  justify-content: center;
}

.login-page__form {
  flex-direction: column;
  width: 300px;
  gap: var(--app-spacing-4);
}

.login-page__heading {
  flex-direction: column;
  gap: var(--app-spacing-4);
}

.login-page__brand {
  align-items: center;
  gap: var(--app-spacing-2);
}

.login-page__google {
  gap: var(--app-spacing-2);
}

.login-page__divider {
  margin: 0;
  font-size: 14px;
}

.login-page__divider :deep(.p-divider-content) {
  background: var(--p-primary-0);
}
</style>
