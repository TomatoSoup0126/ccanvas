import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueEasyLightbox from 'vue-easy-lightbox'
import "./plugins/fontawsome";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component('vue-easy-lightbox', VueEasyLightbox)
  .mount('#app')
