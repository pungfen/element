import type { paths } from '../../api'

export const useRequest = <
  U extends keyof paths,
  D = ResolveArrayElement<paths[U]['response']['data']>,
>(url: U, method: 'delete' | 'get' | 'post' | 'put', options: { data?: D, immedidate?: boolean } = {}) => {
  const { immedidate = true } = options

  const data = ref([] as D[])
  const path = ref()
  const query = ref()
  const isFetching = shallowRef(false)
  const error = ref<Error | null>()
  const paging = ref({ itemCount: 0, pageIndex: 0, pageSize: 0 })

  const execute = async () => {
    isFetching.value = true
    error.value = null

    const response = await fetch(url, { headers: { 'Content-type': 'application/json' }, method })

    response.json().then(
      (res) => {
        if ('data' in res && res.data) {
          data.value = res.data
        }
        // paging.value = { itemCount: 100, pageIndex: 1, pageSize: 20 }
        // data.value = slideshow.slides.map((it: SlideDto, id: number) => ({ id, ...it }))
      },
    ).catch(
      (err: Error) => {
        error.value = err
        return Promise.reject(err)
      },
    )

    isFetching.value = false
  }

  if (immedidate) {
    void execute()
  }

  return { data, execute, isFetching, paging, path, query, url }
}
