<script setup lang="tsx">

const model = ref<null | string>()

const Content = () => (
  <XInput v-model={model.value} />
)
</script>

<template>
  <Content />
</template>
