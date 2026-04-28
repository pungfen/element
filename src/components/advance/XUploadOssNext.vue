<script setup lang="ts" generic="V extends string, MV extends V | V[]">
import type { UploadHooks } from 'element-plus'
import type { VNodeChild } from 'vue'

import { ElMessage, genFileId, useLocale } from 'element-plus'
import { computed, inject, ref } from 'vue'

import { XUpload, type XUploadProps } from '@/basic'
import { X_ELEMENT_CONFIG, X_LOCALE_CONFIG } from '@/constants'

export interface XUploadOssProps extends Omit<
  XUploadProps,
  'action' | 'data' | 'fileList' | 'beforeUpload'
> {
  /** oss 接收文件最大 大约为50兆, 超过50兆应采取oss ststoken 分片上传 */
  maxSize?: number
}

const { maxSize = 50 * 1024 * 1024 } = defineProps<XUploadOssProps>()
defineSlots<{
  default: () => VNodeChild
  tip: () => VNodeChild
}>()

const config = inject(X_ELEMENT_CONFIG)

const model = defineModel<MV>()

const oss = computed(() => (typeof config?.oss === 'function' ? config.oss() : config?.oss))

const url = ref('')
const data = (file: { name: string }) => {
  const key = `${oss.value?.dir}/${Date.now()}/${file.name}`
  url.value = `${oss.value?.host}/${key}`
  return {
    ...oss.value,
    key,
    OSSAccessKeyId: oss.value?.accessId,
    success_action_status: '200'
  }
}

const beforeUpload: UploadHooks['beforeUpload'] = (rawFile) => {
  if (rawFile.size > maxSize) {
    ElMessage.warning('文件过大,请重新选择')
  }
  return rawFile.size < maxSize
}
const remove: UploadHooks['onRemove'] = (_uploadFile, uploadFiles) =>
  (model.value = (Array.isArray(model.value) ? uploadFiles.map((it) => it.url) : undefined) as MV)
const success: UploadHooks['onSuccess'] = () =>
  (model.value = (
    Array.isArray(model.value) ? model.value.concat(url.value as V) : url.value
  ) as MV)
const preview: UploadHooks['onPreview'] = (uploadFile) => window.open(uploadFile.url)

const isPlausibleMillisTimestamp = (s: string) => {
  if (!/^\d+$/.test(s)) return false
  const n = Number(s)
  if (!Number.isSafeInteger(n)) return false
  if (s.length < 12 || s.length > 16) return false
  const t = new Date(n)
  const MIN = Date.UTC(2000, 0, 1)
  const MAX = Date.UTC(2100, 0, 1)
  return n >= MIN && n <= MAX
}

const fileList = computed(() =>
  ([] as string[])
    .concat(model.value ?? [])
    .reverse()
    .map((url) => {
      const segments = url.split('/')
      const name = segments.at(-1)!
      let sid = name?.split('_').at(0)
      if (!sid || !isPlausibleMillisTimestamp(sid)) {
        sid = segments.at(-2)
      }
      if (sid && !isPlausibleMillisTimestamp(sid)) {
        sid = `${genFileId()}`
      }
      return { name, url, uid: Number(sid) }
    })
)

const locale = inject(X_LOCALE_CONFIG, undefined)
const { t } = useLocale(locale)
</script>

<template>
  <XUpload
    v-bind="{
      accept,
      action: oss?.host,
      data,
      fileList,
      beforeUpload,
      onRemove: remove,
      onSuccess: success,
      onPreview: preview
    }"
    showFileList
  >
    <slot>
      <XButton type="primary" size="small">{{ t('el.uploadOss.placeholder') }}</XButton>
    </slot>

    <template v-if="'tip' in $slots" #tip>
      <slot name="tip" />
    </template>
  </XUpload>
</template>
