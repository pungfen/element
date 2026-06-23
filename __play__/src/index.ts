import Element from '@pungfe/element'

import '@/assets/tailwind.css'
import App from '@/app.vue'

const app = createApp(App)

app.use(router)
app.use(Element, { advance: true })
app.mount('#app')
