<script setup lang="tsx" generic="V extends number">
import type { RateProps } from 'element-plus'
import { ElRate } from 'element-plus'

export interface XRateProps extends Partial<Omit<RateProps, 'modelValue'>> {}

const props = withDefaults(defineProps<XRateProps>(), { disabled: undefined })
const model = defineModel<V>()
</script>

<template>
  <ElRate v-bind="props" v-model="model" />
</template>
