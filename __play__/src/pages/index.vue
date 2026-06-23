<template>
  <div class="flex flex-col gap-2">
    <ElSpace>
      <RouterLink to="/select-request" custom #default="{ navigate }">
        <ElButton @click="navigate">select-request</ElButton>
      </RouterLink>

      <RouterLink to="/date-picker" custom #default="{ navigate }">
        <ElButton @click="navigate">date-picker</ElButton>
      </RouterLink>
    </ElSpace>
  </div>
</template>
