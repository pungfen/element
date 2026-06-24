<script setup lang="tsx">
interface User {
  age: number
  id?: number
  name?: string
  sex?: LookupDto
}

const table = ref<ComponentExposed<typeof XTable> | null>()
const data = ref<User[]>(Array.from({ length: 20 }).fill(null).map(
  (_, index) => ({
    age: useToNumber((Math.random() * 100).toFixed(0)).value,
    id: index,
    name: `name_${index}`,
    sex: {
      code: '',
      message: index ? '男' : '女',
      type: '',
    },
  }),
))

const Content = () => (
  <XTable
    border
    columns={[
      { content: ({ row }) => row.name, label: '姓名' },
      { content: ({ row }) => row.age, label: '年龄' },
      { content: ({ row }) => row.sex?.message, label: '性别' },
    ]}
    data={data.value}
    height={300}
    ref={table}
  />
)
</script>

<template>
  <Content />
</template>
