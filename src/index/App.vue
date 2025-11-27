<template>
    <v-app>
        <page_loader :loading = 'loading' />
        <!-- <title_nav /> -->

        <v-main>

            <v-container>
                <div id = background />

                <v-row>
                    <v-col>
                        <v-card title = 'Server URL' subtitle = 'Devs only' variant = tonal class = ma-3>
                            <template #text>
                                <v-text-field v-model = url @blur = init />
                            </template>
                        </v-card>
                    </v-col>
                </v-row>
                
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
                                <v-textarea clearable label = '規則...' bg-color = transparent clear-icon = 'fa-solid fa-close' v-model = rules />
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
                                    @click = 'submit_rules'
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

    <!-- <site_footer></site_footer> -->
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

import { animate, stagger, onScroll, text } from 'animejs';

export default {
    name: 'App',
    data() {
        return {
            loading: true,
            history: [
                {user: 'AI', time: '3:13 A.M.', text: 'ouob'},
                {user: 'user', time: '8:14 P.M.', text: 'ouob'},
            ],
            rules: '',
            url: 'http://127.0.0.1:5000'
        }
    },
    components: {
        page_loader,
        site_footer
    },
    mounted() {
        M.AutoInit();
        animate('body', {
            // filter: 'blur(50px)',
            autoplay: onScroll({
                enter: 'top top',
                leave: 'bottom bottom',
                sync: true,
                onUpdate: (e) => {
                    // console.log(`linear-gradient(${Math.floor(720 * e.progress)}deg, orange, purple)`);
                    $('.rainbow').css({
                        background: `linear-gradient(${Math.floor(360 * e.progress)}deg, orange, purple)`,
                        'background-clip': 'text'
                    })
                    $('#background').css({
                        background: `linear-gradient(${45 + Math.floor(360 * e.progress)}deg, orange, pink)`,
                        filter: `blur(${Math.floor(500 * e.progress)}px)`
                    })
                }
            })
        })
        this.init();
    },
    methods: {
        init() {
            $.ajax({
                url: this.url + '/beat',
                type: 'POST',
                timeout: 3000,
                data: {}
            }).done((response) => {
                M.toast({html: JSON.stringify(response), classes: 'rounded amber'});
            }).fail(() => {
                M.toast({html: 'Server down', classes: 'red rounded'})
            }).always(() => this.loading = false)
        },
        submit_rules() {
            $.ajax({
                url: this.url + '/model/ask_llm',
                type: 'POST',
                data: {
                    data: this.rules
                },
                timeout: 300000
            }).done((response) => {
                console.log(response);
                if(this.check_response(response)) return;
                this.rules = response.data;
            })
        },
        check_response(response) {
            if(!response['ok']) {
                M.toast({html: 'ERROR Found: ' + response['error'], classes: 'red rounded'});
                return 1;
            }
            return 0;
        }
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
#background {
    background: linear-gradient(45deg, orange, pink);
    z-index: 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}
</style>