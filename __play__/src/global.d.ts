export {}

declare global {
  export interface LookupDto {
    code: string
    message: string
    type: string
  }

  export interface SlideDto {
    id?: number
    title?: string
    type?: string
  }
}
