import Element from '@pungfe/element'
import 'element-plus/theme-chalk/dark/css-vars.css'

import '@/assets/tailwind.css'
import App from '@/app.vue'

const app = createApp(App)

app.use(router)
app.use(Element, { advance: true })
app.mount('#app')
