import type { XButtonConfig, XTableConfig } from '@/basic'

export interface ElementConfig {
  button?: XButtonConfig
  table?: XTableConfig
  oss?: OssInfo | (() => OssInfo)
}

export interface Paging {
  pageIndex: number
  pageSize: number
  itemCount: number
}

export interface TableColumnField {
  code: string
  width?: number
  visible?: boolean
  label?: string
  prop?: string
  search?: boolean
}

export interface OssInfo {
  accessId?: string
  accessSecret?: string
  host?: string
  dir?: string
  policy?: string
  expire?: number
  signature?: string
  accessKeyId?: string
  accessKeySecret?: string
}
