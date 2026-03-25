import XButtonAsync from '@/components/advance/XButtonAsync.vue'
import XButtonConfirm from '@/components/advance/XButtonConfirm.vue'
import XFormFlex from '@/components/advance/XFormFlex.vue'
import XFormRequestNext from '@/components/advance/XFormRequestNext.vue'
import XRequest from '@/components/advance/XRequest.vue'
import XSelectRequest from '@/components/advance/XSelectRequest.vue'
import XTableFlex from '@/components/advance/XTableFlex.vue'
import XTableRequestConfigNext from '@/components/advance/XTableRequestConfigNext.vue'
import XTableRequestNext from '@/components/advance/XTableRequestNext.vue'
import XUploadOssNext from '@/components/advance/XUploadOssNext.vue'

export {
  XButtonAsync,
  XButtonConfirm,
  XFormFlex,
  XFormRequestNext,
  XRequest,
  XSelectRequest,
  XTableFlex,
  XTableRequestConfigNext,
  XTableRequestNext,
  XUploadOssNext
}

export * from '@/components/advance/XButtonAsync.vue'
export * from '@/components/advance/XButtonConfirm.vue'
export * from '@/components/advance/XFormFlex.vue'
export * from '@/components/advance/XFormRequestNext.vue'
export * from '@/components/advance/XRequest.vue'
export * from '@/components/advance/XSelectRequest.vue'
export * from '@/components/advance/XTableFlex.vue'
export * from '@/components/advance/XTableRequestConfigNext.vue'
export * from '@/components/advance/XTableRequestNext.vue'
export * from '@/components/advance/XUploadOssNext.vue'

declare module 'vue' {
  export interface GlobalComponents {
    XButtonAsync: typeof XButtonAsync
    XButtonConfirm: typeof XButtonConfirm
    XFormFlex: typeof XFormFlex
    XFormRequestNext: typeof XFormRequestNext
    XRequest: typeof XRequest
    XSelectRequest: typeof XSelectRequest
    XTableFlex: typeof XTableFlex
    XTableRequestNext: typeof XTableRequestNext
    XTableRequestConfigNext: typeof XTableRequestConfigNext
    XUploadOssNext: typeof XUploadOssNext
  }
}
