<script setup lang="tsx">
interface User {
  age: number
  name?: string
  sex?: LookupDto
}

const form = ref<ComponentExposed<typeof XForm> | null>()
const model = ref<User>({ age: 0 })

const Content = () => (
  <XForm
    content={({ data }) => (
      <>
        <XFormItem content={() => <XInput v-model={data.name} />} label="姓名" required />
        <XFormItem content={() => <XInputNumber v-model={data.age} />} label="年龄" />
        <XFormItem
          content={() => (
            <XSelect
              data={[{ code: 'M', message: '男', type: 'SEX' }, { code: 'W', message: '女', type: 'SEX' }]}
              factory={option => ({ label: option.message, value: option })}
              identify={v => v.code}
              v-model={data.sex}
            />
          )}
          label="性别"
          required
        />
        <XFormItem content={() => (
          <ElSpace>
            <XButton onClick={() => form.value?.validate()} type="primary">表单校验</XButton>
            <XButton onClick={() => form.value?.validate()} type="primary">清除校验</XButton>
            <XButton onClick={() => form.value?.validate()} type="primary">重置表单</XButton>
          </ElSpace>
        )}
        />
      </>
    )}
    data={model.value}
  />
)
</script>

<template>
  <Content />
</template>
