<script setup lang="tsx">
const form = ref<ComponentExposed<typeof XForm> | null>()
const model = ref<dtos['User']>({ age: 0 })

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
            <XButton
              onClick={() => {
                if (form.value?.validate()) {
                  ElMessage({ message: '校验通过', type: 'success' })
                }
                else {
                  ElMessage({ message: '校验失败', type: 'error' })
                }
              }}
              type="primary"
            >
              表单校验
            </XButton>
            <XButton onClick={() => form.value?.validate()} type="primary">清除校验</XButton>
            <XButton onClick={() => form.value?.validate()} type="primary">重置表单</XButton>
          </ElSpace>
        )}
        />
        <XFormItem content={() => (
          <ElSpace>
            <XButtonAsync
              action={() => ElMessage.info('点击')}
              type="primary"
            >
              XButtonAsync
            </XButtonAsync>
          </ElSpace>
        )}
        />
      </>
    )}
    data={model.value}
    disabled
    ref={form}
  />
)
</script>

<template>
  <Content />
</template>
