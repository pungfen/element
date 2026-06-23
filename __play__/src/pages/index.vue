<script setup lang="tsx">
interface UserDto {
  id?: number
  name?: string
}

const request = <T extends object>(url: string) => {
  const data = ref<T[]>([])
  const path = ref()
  const query = ref()
  const isFetching = ref(false)

  const execute = async () => {
    await Promise.resolve([])
  }

  return { data, execute, isFetching, path, query, url }
}

const SelectPlay = () => (
  <ElSpace>
    <XSelectRequest
      class="w-50!"
      factory={option => ({ label: option.name, value: option })}
      identify={v => v.id!}
      remote
      request={() => request<UserDto>('/admin/user')}
    />
  </ElSpace>
)
</script>

<template>
  <div class="flex flex-col gap-2">
    <SelectPlay />
  </div>
</template>
