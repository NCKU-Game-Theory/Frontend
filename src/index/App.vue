<template>
    <v-app>
        <page_loader :loading = 'loading' />
        <!-- <title_nav /> -->

        <v-main>

            <v-container>
                <v-card class = 'text-center glasss ma-3'>
                    <template #title>
                        Sphinx
                    </template>
                    <template #subtitle>
                        明智地玩遊戲
                    </template>
                </v-card>

                <v-card class = ' ma-3'>
                    <template #title>
                        遊戲規鑿
                    </template>
                    <template #subtitle>
                        挑戰者們請制定規則
                    </template>
                    <template #text>
                        <v-card variant = tonal>
                            <template #text>
                                <v-textarea clearable label = '規則...' bg-color = transparent clear-icon = 'fa-solid fa-close' />
                            </template>
                        </v-card>
                    </template>
                    <template #actions>
                        <v-hover>
                            <template #default = '{isHovering, props}'>
                                <v-card
                                    title = '送出'
                                    v-bind = props
                                    width = 100%
                                    class = text-center
                                    :color = 'isHovering ? `primary` : undefined'
                                    :variant = 'isHovering ? undefined : `tonal`'
                                    v-ripple
                                />
                            </template>
                        </v-hover>
                    </template>
                </v-card>

                <v-card title = 資訊 class = 'ma-3 text-center'>
                    <v-row>
                        <v-col><v-card variant = tonal title = 信心 /></v-col>
                        <v-col><v-card variant = tonal title = 分類 /></v-col>
                    </v-row>
                </v-card>

                <v-card title = 歷史對局 class = 'ma-3'>
                    
                </v-card>

                <v-card class = 'ma-3 text-center'>
                    <template #title>
                        <b class = 'text-center rainbow big'> Play With Bot </b>
                    </template>
                    <template #text>
                        <v-row v-for = 'i in history' :key = i :justify = 'i.user == `AI` ? `begin` : `end`'>
                            <v-col cols = 12 md = 10 lg = 8>
                                <v-card
                                    :title = i.user
                                    :subtitle = i.time
                                    :class = 'i.user == `AI` ? `text-left` : `text-right`'
                                    :color = 'i.user == `AI` ? undefined : `secondary`'
                                    :text = i.text
                                />
                            </v-col>
                        </v-row>
                    </template>
                </v-card>
            </v-container>

        </v-main>
    </v-app>

    <site_footer></site_footer>
</template>

<script>
 /* eslint-disable */ 
import $ from 'jquery'
// import M from 'materialize-css'

import title_nav from '@/title.vue'
import page_loader from '@/loader.vue'
import site_footer from '@/footer.vue'

import { useDisplay } from 'vuetify'
import { templateRef } from 'vuetify/lib/util'

export default {
    name: 'App',
    data() {
        return {
            loading: true,
            history: [
                {user: 'AI', time: '3:13 A.M.', text: 'ouob'},
                {user: 'user', time: '8:14 P.M.', text: 'ouob'},
            ]
        }
    },
    components: {
        page_loader,
        site_footer
    },
    mounted() {
        M.AutoInit();
        setTimeout(() => {
            this.loading = false;
        }, 100);
    },
    methods: {
    }
}
</script>

<style>
* {
  transition: 1s all;
}
.rainbow {
    background: linear-gradient(45deg, orange, purple);
    background-clip: text;
    color: transparent;
}
.big {
    font-size: xx-large;
}
</style>