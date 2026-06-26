export {}

declare global {
  export type ResolveArrayElement<T> = T extends (infer R)[] ? R : never

  void import('../api')
  export type { dtos, paths } from '../api'
}
