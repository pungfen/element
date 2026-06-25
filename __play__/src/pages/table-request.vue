<script setup lang="tsx">

const table = ref<ComponentExposed<typeof XTableRequest> | null>()

const Content = () => (
  <XTableRequest
    columns={[
      { content: ({ row }) => row.name, label: '姓名' },
      { content: ({ row }) => row.age, label: '年龄' },
      { content: ({ row }) => row.sex?.message, label: '性别' },
    ]}
    ref={table}
    request={() => useRequest('/api/user', 'get', {})}
  />
)
</script>

<template>
  <div class="h-150 flex flex-col">
    <Content />
  </div>
</template>
