import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import {createPinia} from 'pinia'
import AppMixins from './mixins/app.mixins'

export function createApp() {
	const app = createSSRApp(App);
	app.use(createPinia());
	// 全局的分享
	app.mixin(AppMixins);
	return {
		app,
	};
}
