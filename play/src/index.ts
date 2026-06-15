import XElement from '@pungfe/element'

import '@/assets/tailwind.css'
import App from '@/app.vue'

const app = createApp(App)

app.use(router)
app.use(XElement, { advance: true })
app.mount('#app')
