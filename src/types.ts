import type { XButtonConfig, XTableConfig, XPaginationConfig, XDateConfig } from '@/basic'

export interface ElementConfig {
  button?: XButtonConfig
  datePicker?: XDateConfig
  table?: XTableConfig
  oss?: OssInfo | (() => OssInfo)
  pagination?: XPaginationConfig
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
