/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'
// Styles
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  defaults: {
    global: { ripple: true },
    VCard: { rounded: 'lg', class: 'spacious' },
    VContainer: { class: 'section' },
    VBtn: { rounded: 'xl' },
  },
  theme: {
    defaultTheme: 'brand',
    themes: {
      brand: {
        dark: false,
        colors: {
          primary: '#FF7700',
          secondary: '#FFAA00',
          background: '#FAF7EF',
          surface: '#FFFFFF',
          error: '#B00020',
          info: '#00AAAA',
          success: '#16A34A',
          warning: '#F59E0B',
        },
      },
    },
  },
})
