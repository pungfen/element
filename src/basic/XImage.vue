<script setup lang="ts">
import type { ImageProps } from 'element-plus'
import { ElImage } from 'element-plus'

export interface XImageProps extends Partial<ImageProps> {}

const props = defineProps<XImageProps>()
</script>

<template>
  <ElImage v-bind="props" />
</template>
