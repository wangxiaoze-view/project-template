import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import 'vant/lib/index.css';
import '@vant/touch-emulator';
import VueWechatTitle from 'vue-wechat-title';
import handler from '@/utils/handler';

handler();
createApp(App).use(createPinia()).use(router).use(VueWechatTitle).mount('#app');
