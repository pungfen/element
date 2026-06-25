export {}

declare global {
  export type ResolveArrayElement<T> = T extends (infer R)[] ? R : never
}
