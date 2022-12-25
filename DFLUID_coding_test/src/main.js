import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/scss/reset.scss";
import "./assets/scss/fonts.scss";
import "./assets/scss/common.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
