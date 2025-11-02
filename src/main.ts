import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createGtag } from "vue-gtag";

if (import.meta.env.PROD) {
  createApp(App)
    .use(store)
    .use(router)
    .use(createGtag({ config: { id: "G-KWMEVYXEHM" } }))
    .mount("#app");
} else {
  createApp(App).use(store).use(router).mount("#app");
}

//暫定対応
const publicPath = "/";
export { publicPath };
