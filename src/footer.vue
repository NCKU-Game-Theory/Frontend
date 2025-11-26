<template>
  <v-footer height="auto" class="glass elevate mt-10" style="border-radius: var(--radius); position: related;">
    <v-container class="py-6">
      <v-row>
        <v-col cols="12" md="6" class="mb-4">
          <div class="d-flex align-center mb-2">
            <img src="Logo/logo.png" height="28" class="mr-2" alt="Sphinx" />
            <div class="text-h6"><b class="text-primary">Sphinx</b></div>
          </div>
          <div class="text-muted" style="font-size: 0.95rem;">
            <b> Sphinx </b>
          </div>
        </v-col>

        

        <v-col cols="12" sm="6" md="6">
          <div class="text-subtitle-1" style="font-family: 'Nunito', 'Inter', sans-serif; font-weight: 700;">Contact</div>
          <div class="text-muted" style="font-size: 0.95rem;">
            <b> Sphinx </b>
          </div>
          <div class="mt-2">
            <v-btn text = 'Top' variant="text" color="primary" href="#top" aria-label="Back to top" @click.prevent="goTop" />
          </div>
        </v-col>
      </v-row>

      <!-- Sponsors -->
      <v-row class="align-center mt-4">
        <v-col cols="12">
          <div class="text-subtitle-1 mb-2" style="font-family: 'Nunito', 'Inter', sans-serif; font-weight: 700;">Sponsors</div>
          <div class="d-flex flex-wrap align-center" style="gap: 16px;">
            <template v-for="s in sponsors" :key="s.name">
              <v-tooltip :text = s.popup>
                <template #activator = '{props}'>
                  <v-img class = 'cursor-help' v-bind = props @click = 'gourl(s.url)' v-if="s.logo" :src="s.logo" :alt="s.name" height="50" contain style="max-width: 140px;" />
                  <v-chip v-else color="primary" variant="tonal" class="text-capitalize">{{ s.name }}</v-chip>
                </template>
              </v-tooltip>
            </template>
          </div>
        </v-col>
      </v-row>
      <v-divider class="my-4 soft-divider" />
      <v-row class="text-center">
        <v-col cols="12" class="text-muted" style="font-size: 0.9rem;">
          © {{ new Date().getFullYear() }} - Content on this site is licensed under a 
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">Creative Commons Attribution 4.0 International license</a>.
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'site_footer',
  data() {
    return {
      sponsors: [],
    }
  },
  methods: {
    goTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) },
    gourl(x) {
      location.href = x;
    }
  }
}
</script>

<style scoped>
</style>
