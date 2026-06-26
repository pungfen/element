export interface dtos {
  lookup: {
    code: string
    message: string
    type: string
  }
  User: {
    address?: string
    age: number
    comment?: string
    id?: number
    name?: string
    preparedDatetime?: string
    sex?: LookupDto
  }
}

export interface paths {
  '/api/user': {
    query: never
    response: Response<UserDto>
  }
}

export interface Response<T> {
  data: T[]
}
