<script setup lang="tsx">
import { en, zhCn } from '@pungfe/element/locales'

const language = useStorage('X_ELEMENT_LANGUAGE', 'zh-CN')
const locale = computed(() => language.value === 'en' ? en : zhCn)

const time = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
</script>

<template>
  <Suspense>
    <XConfigProvider :locale="locale">
      <div class="flex flex-col gap-2">
        <div class="p-2 outline outline-b outline-(--el-border-color) flex items-center gap-2">
          <i-ep-element-plus class="text-3xl text-(--el-color-primary)" />

          <ElText type="primary">XElement</ElText>

          <div class="flex-1"></div>

          <ElSpace>
            <ElSelect
              v-model="language"
              :options="[{ label: '中文', value: 'zh-CN' }, { label: '英文', value: 'en' },]"
              class="w-20!"
            />

            <ElText type="info">{{ time }}</ElText>
          </ElSpace>
        </div>

        <div class="flex-1 overflow-hidden flex flex-col gap-2">
          <RouterView />
        </div>
      </div>
    </XConfigProvider>
  </Suspense>
</template>

<style>
html,
body,
#app {
  height: 100%;
}
</style>
