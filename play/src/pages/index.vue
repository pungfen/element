<script setup lang="tsx">
const router = useRouter()

const navigator = () => router.push('/')
</script>

<template>
  <div>
    <XButton type="primary" @click="navigator">
      xx
    </XButton>
    <XDatePicker type="daterange" />
  </div>
</template>
