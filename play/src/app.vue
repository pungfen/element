<script setup lang="tsx">
import { zhCn } from '@pungfe/element/locales'
</script>

<template>
    <Suspense>
        <XConfigProvider :locale="zhCn">
        <div class="flex flex-col">
            <div></div>
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
