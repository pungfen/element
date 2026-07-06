<script setup lang="tsx">
import type { XDatePickerProps } from '@pungfe/element/basic'

const type = ref<XDatePickerProps['type']>('date')
const valueFormat = ref<XDatePickerProps['valueFormat']>('YYYY-MM-DD')
const model = ref<string>()
const start = ref<string>()
const end = ref<string>()

const Content = () => (
  <XDatePicker
    end={end.value}
    modelValue={model.value}
    onUpdate:end={value => end.value = value}
    onUpdate:modelValue={value => model.value = value}
    onUpdate:start={value => start.value = value}
    start={start.value}
    type={type.value}
    valueFormat={valueFormat.value}
  />
)
</script>

<template>
  <ElSpace direction="vertical" alignment="start">
    <ElForm label-width="auto">
      <ElFormItem label="type">
        <ElRadioGroup v-model="type">
          <ElRadio value="date">date</ElRadio>

          <ElRadio value="daterange">daterange</ElRadio>

          <ElRadio value="datetime">datetime</ElRadio>

          <ElRadio value="datetimerange">datetimerange</ElRadio>

          <ElRadio value="month">month</ElRadio>

          <ElRadio value="monthrange">monthrange</ElRadio>

          <ElRadio value="year">year</ElRadio>

          <ElRadio value="yearrange">yearrange</ElRadio>

          <ElRadio value="years">years</ElRadio>

          <ElRadio value="week">week</ElRadio>
        </ElRadioGroup>
      </ElFormItem>

      <ElFormItem label="valueFormat">
        <ElInput v-model="valueFormat"></ElInput>
      </ElFormItem>
    </ElForm>

    <ElText>model: {{ model }}</ElText>

    <ElText>start: {{ start }}</ElText>

    <ElText>end: {{ end }}</ElText>

    <Content />

  </ElSpace>
</template>
