import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueEasyLightbox from 'vue-easy-lightbox'
import "./plugins/fontawsome";

import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component('vue-easy-lightbox', VueEasyLightbox)
  .use(VueLoading)
  .mount('#app')
