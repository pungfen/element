<script setup lang="tsx">
import type { ConfigProviderProps } from 'element-plus'
import { computed, provide } from 'vue'
import { X_LOCALE_CONFIG } from '@/constants'

import { zhCn } from '@/locales'

const { locale } = defineProps<XConfigProviderProps>()

export interface XConfigProviderProps {
  locale?: ConfigProviderProps['locale']
}

const localLocale = computed(() => locale ?? zhCn)

provide(X_LOCALE_CONFIG, localLocale)
</script>

<template>
  <slot></slot>
</template>
