export const useRequest = <T extends object>(url: string, method: 'delete' | 'get' | 'post' | 'put', options: { immedidate?: boolean } = {}) => {
  const { immedidate = true } = options

  const data = ref<T[]>([])
  const path = ref()
  const query = ref()
  const isFetching = shallowRef(false)
  const error = ref<Error | null>()
  const paging = ref({ itemCount: 0, pageIndex: 0, pageSize: 0 })

  const execute = async () => {
    isFetching.value = true
    error.value = null

    const res = await fetch(`http://httpbin.org${url}`, { headers: { 'Content-type': 'application/json' }, method, mode: 'cors' })

    res.json().then(
      ({ slideshow }) => {
        paging.value = { itemCount: 100, pageIndex: 1, pageSize: 20 }
        data.value = slideshow.slides.map((it: SlideDto, id: number) => ({ id, ...it }))
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

  return { data, execute, isFetching, path, query, url }
}
