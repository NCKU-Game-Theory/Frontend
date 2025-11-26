// Centralized Vuetify with warm theme and icon set
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { fa } from "vuetify/iconsets/fa";
// import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Load global theme CSS once per entry
import '../styles/theme.css'

// import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";

const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    global: { ripple: true },
    VCard: { rounded: 'lg', class: 'spacious' },
    VContainer: { class: 'section' },
    VBtn: { rounded: 'xl' },
  },
  icons: {
    defaultSet: 'fa',
    sets: { fa },
  },
  theme: {
    defaultTheme: 'brand',
    themes: {
      brand: {
        dark: false,
        colors: {
          primary: '#FF8800',
          secondary: '#AAAA00',
          background: '#FAF7EF',
          surface: '#FFFFFF',
          error: '#B00020',
          info: '#0055AA',
          success: '#16A34A',
          warning: '#F59E0B',
        },
      },
    },
  },
})

export default vuetify
