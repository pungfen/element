<script setup lang="ts">
const router = useRouter()

const routes = router.getRoutes().splice(1)
</script>

<template>
  <div class="flex flex-col gap-2">
    <ElSpace>
      <RouterLink v-for="item of routes" :to="item.path" custom #default="{ navigate }">
        <ElButton @click="navigate">{{ item.name }}</ElButton>
      </RouterLink>

    </ElSpace>
  </div>
</template>
