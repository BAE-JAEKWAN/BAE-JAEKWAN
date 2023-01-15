import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar';
import quasarIconSet from 'quasar/icon-set/svg-material-icons';

const app = createApp(App)

app.use(Quasar, {
  iconSet: quasarIconSet,
});
quasarIconSet.table.arrowUp = 'fa-solid fa-sort';
