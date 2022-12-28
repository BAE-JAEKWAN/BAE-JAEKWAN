import { createApp } from "vue";
import { createPinia } from "pinia";
// import axios from "axios";
import sectionTemp from "@/components/sectionTemp.vue";

import App from "./App.vue";
import router from "./router";

import "./assets/scss/reset.scss";
import "./assets/scss/fonts.scss";
import "./assets/scss/common.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("sectionTemp", sectionTemp);

// 다른 컴포넌트에서는 import 없이 this.axios로 사용가능
// app.config.globalProperties.$axios = axios;

app.mount("#app");
