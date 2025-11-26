// import 'material-design-icons/iconfont/material-icons.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import $ from 'jquery';
window.$ = window.jQuery = $;
import { createApp } from 'vue'
import App from './App.vue'
// import "@mdi/font/css/materialdesignicons.css";
// import "@fortawesome/fontawesome-free/css/all.css";

// createApp(App).mount('#app')


// Vuetify (shared theme)
import vuetify from '../plugins/vuetify'
import reveal from '../plugins/reveal'

createApp(App).use(vuetify).use(reveal).mount('#app')
