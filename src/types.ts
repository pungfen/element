import type { XButtonConfig, XDateConfig, XPaginationConfig, XTableConfig } from '@/basic'

export interface ElementConfig {
  button?: XButtonConfig
  datePicker?: XDateConfig
  oss?: (() => OssInfo) | OssInfo
  pagination?: XPaginationConfig
  table?: XTableConfig
}

export interface OssInfo {
  accessId?: string
  accessKeyId?: string
  accessKeySecret?: string
  accessSecret?: string
  dir?: string
  expire?: number
  host?: string
  policy?: string
  signature?: string
}

export interface Paging {
  itemCount: number
  pageIndex: number
  pageSize: number
}

export interface TableColumnField {
  code: string
  label?: string
  prop?: string
  search?: boolean
  visible?: boolean
  width?: number
}
