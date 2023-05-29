import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import '@/utils/mixins'
import $ from 'jquery' //导入jquery

const app = createApp(App)

app
.use(router)
.use($)
.mount('#app')