<script setup lang="tsx">

const Content = () => (
  <ElSpace>
    <XSelectRequest
      class="w-50!"
      factory={option => ({ label: option.title, value: option })}
      identify={v => v.id!}
      remote
      request={() => useRequest<SlideDto>('/json', 'get', { immedidate: false })}
    />
  </ElSpace>
)
</script>

<template>
  <Content />
</template>
