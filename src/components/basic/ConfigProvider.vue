<script setup lang="tsx">
import { ElConfigProvider } from 'element-plus'
import { computed, provide } from 'vue'

import { X_LOCALE_CONFIG } from '@/constants'
import { zhCn } from '@/locales'

import type { ConfigProviderProps } from 'element-plus'

const { locale } = defineProps<XConfigProviderProps>()

export interface XConfigProviderProps {
  locale?: ConfigProviderProps['locale']
}

const localLocale = computed(() => locale ?? zhCn)

provide(X_LOCALE_CONFIG, localLocale)
</script>

<template>
  <ElConfigProvider>
    <slot></slot>
  </ElConfigProvider>
</template>
