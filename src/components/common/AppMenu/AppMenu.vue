<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

import { storeToRefs } from 'pinia'

import Button from 'primevue/button'
import Divider from 'primevue/divider'
import Sidebar from 'primevue/sidebar'
import SidebarAside from 'primevue/sidebaraside'
import SidebarContent from 'primevue/sidebarcontent'
import SidebarFooter from 'primevue/sidebarfooter'
import SidebarGroup from 'primevue/sidebargroup'
import SidebarHeader from 'primevue/sidebarheader'
import SidebarLayout from 'primevue/sidebarlayout'
import SidebarMain from 'primevue/sidebarmain'
import SidebarMenu from 'primevue/sidebarmenu'
import SidebarMenuButton from 'primevue/sidebarmenubutton'
import SidebarMenuItem from 'primevue/sidebarmenuitem'
import SidebarPanel from 'primevue/sidebarpanel'
import SidebarSpacer from 'primevue/sidebarspacer'

import { MENU_ITEMS } from '@/data/global'

import { useAppDataStore } from '@/stores/appData'

import { useAuth } from '@/composables/useAuth'
import { useBreakpoint } from '@/composables/useBreakpoint'

import AppName from '@/components/core/AppName/AppName.vue'
import FlexStack from '@/components/core/FlexStack/FlexStack.vue'

import * as Languages from './lang'

const route = useRoute()
const { language } = storeToRefs(useAppDataStore())
const { logout } = useAuth()
const { isDesktop } = useBreakpoint()
</script>

<template>
  <FlexStack class="app-menu">
    <SidebarLayout class="app-menu__layout">
      <Sidebar v-if="isDesktop" width="var(--app-menu-size)" class="app-menu__sidebar">
        <SidebarSpacer />
        <SidebarAside class="app-menu__aside">
          <SidebarPanel>
            <SidebarHeader>
              <AppName :is-description-visible="false" />
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <nav>
                  <SidebarMenu>
                    <SidebarMenuItem v-for="item in MENU_ITEMS" :key="item.routeName">
                      <SidebarMenuButton
                        :as="RouterLink"
                        :to="{ name: item.routeName }"
                        :is-active="route.name === item.routeName"
                        class="app-menu__item"
                      >
                        <i :class="[item.icon, 'app-menu__item-icon']" />
                        <span>{{ item.label[language] }}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </nav>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
              <Divider align="center" class="app-menu__divider" />
              <Button
                :label="Languages.LOGOUT[language]"
                icon="pi pi-sign-out"
                variant="text"
                fluid
                @click="logout"
                class="app-menu__logout-button"
              />
            </SidebarFooter>
          </SidebarPanel>
        </SidebarAside>
      </Sidebar>

      <SidebarMain as="DIV" class="app-menu__main">
        <FlexStack v-if="!isDesktop" class="app-menu__topbar">
          <AppName :is-description-visible="false" />
        </FlexStack>
        <slot />
      </SidebarMain>
    </SidebarLayout>
  </FlexStack>
</template>

<style scoped>
.app-menu__layout {
  width: 100%;
  min-height: 100vh;
}

.app-menu__aside {
  position: fixed;
}

.app-menu__item {
  text-decoration: none;
}

.app-menu__item[data-active='true'] {
  font-weight: 700;
}

.app-menu__item-icon {
  font-size: 20px;
}

.app-menu__divider {
  margin: 0;
}

.app-menu__logout-button {
  justify-content: flex-start;
  font-size: 16px;
  padding: var(--app-spacing-2) var(--app-spacing-6);
}

.app-menu__logout-button :deep(.p-button-icon) {
  font-size: 20px;
}

.app-menu__topbar {
  align-items: center;
  gap: var(--app-spacing-2);
  padding: var(--app-spacing-3) var(--app-spacing-4) var(--app-spacing-0);
}
</style>
