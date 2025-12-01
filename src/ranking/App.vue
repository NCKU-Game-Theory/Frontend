<template>
    <v-app>
        <page_loader :loading = 'loading' />
        <!-- <title_nav /> -->

        <v-main>
            <v-container v-if = ok>
                <v-card class = glass>
                    <template #title>
                        <b> 成功 </b>
                    </template>
                </v-card>
            </v-container>
            
            <v-container v-else>
                <div id = background class = ma-3 />
                <v-btn text = 開版 @click = 'blur = false' />

                <v-card title = '現在平均值' class = ma-3>
                    <template #text>
                        <b :class = 'blur ? `blur big` : `big`'> {{ mean }} </b>
                    </template>
                </v-card>

                <v-row v-for = 'i, j in f' :key = 'i'>
                    <v-col cols = 10>
                        <v-card :title = i[0] :subtitle = '`第 ${j + 1} 名`' :text = 'blur ? `誤差 ??? ` : `誤差 ${i[2]}`' class = 'glass ma-3' />
                    </v-col>
                    <v-cols cols = 2>
                        <v-card :title = i[1] class = 'ma-3' :class = 'blur ? `blur` : undefined' />
                    </v-cols>
                </v-row>

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

import { useDisplay, useGoTo } from 'vuetify'
import { templateRef } from 'vuetify/lib/util'

import { animate, stagger, onScroll, text } from 'animejs';

export default {
    name: 'App',
    data() {
        return {
            loading: true,
            f: [],
            mean: -1,
            url: 'https://api.ysh.xx.kg/',
            blur: true
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
        animate('.loading', {
            filter: [
                {to: '0px', duration: 1000},
                {to: '50px', duration: 1000}
            ],
            loop: true,
            ease: 'inOutCirc'
        })
    },
    methods: {
        init() {
            $.ajax({
                url: this.url + '/beat',
                type: 'POST',
                timeout: 3000,
                data: {}
            }).done((response) => {
                // M.toast({html: JSON.stringify(response), classes: 'rounded amber'});
                setInterval(() => {
                    $.get(this.url + '/game/get_number', (response) => {
                        if(this.check_response(response)) return;

                        this.mean = response.data.mean;
                        this.f = response.data.ls;
                    })
                }, 3000);
            }).fail(() => {
                M.toast({html: 'Server down', classes: 'red rounded'})
            }).always(() => this.loading = false)
        },
        submit() {
            $.ajax({
                url: this.url + '/game/number',
                type: 'POST',
                data: {
                    username: this.username,
                    number: this.number
                }
            }).done((response) => {
                if(this.check_response(response)) return;
                if(response.ok) this.ok = true;
            })
        },
        check_response(response) {
            if(!response['ok']) {
                M.toast({html: 'ERROR Found: ' + response['error'], classes: 'red rounded'});
                return 1;
            }
            return 0;
        },
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
.loading {
    filter: blur(50px);
}
#test {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
}
.blur {
    filter: blur(27px);
}
</style>