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

                <v-card title = 資訊 class = 'ma-3 text-center glass' id = info>
                    <div id = 'test' class = 'align-content-center' v-if = load.info>
                        <v-progress-circular indeterminate />
                    </div>
                    <v-row :class = 'load.info ? `loading` : undefined'>
                        <v-col><v-card variant = tonal title = 信心>
                            <template #text>
                                <b class = 'big rainbow'> {{ game.faith }} </b>
                            </template>
                        </v-card></v-col>
                        <v-col><v-card variant = tonal title = 次數>
                            <template #text>
                                <b class = 'big rainbow'> {{ game.trial + 1 }} </b>
                            </template>
                        </v-card></v-col>
                        <v-col><v-card variant = tonal title = 分類>
                            <template #text>
                                <b class = 'big rainbow'> {{ game.category }} </b>
                            </template>
                        </v-card></v-col>
                    </v-row>
                </v-card>

                <v-card title = 最佳策略 class = 'ma-3' id = strategy>
                    <div id = 'test' class = 'align-content-center text-right' v-if = load.strategy>
                        <v-progress-circular indeterminate class = ma-5 />
                    </div>
                    <div :class = 'load.strategy ? `loading` : undefined'>
                        <b> {{ game.strategy }} </b>
                    </div>
                </v-card>

                <v-card class = 'ma-3 text-center'>
                    <template #title>
                        <b class = 'text-center rainbow big'> Play With Bot </b>
                    </template>
                    <template #text>
                        <v-row v-for = 'i, j in history' :key = j :justify = 'i.user == `AI` ? `start` : `end`'>
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

                <v-hover>
                    <template #default = '{isHovering, props}'>
                        <a href = 'https://github.com/NCKU-Game-Theory'>
                            <v-card class = ma-3 title = 'GitHub Repository' v-bind = props :color = 'isHovering ? `primary` : `cyan`' :variant = 'isHovering ? undefined : `tonal`' target = '_blank' />
                        </a>
                    </template>
                </v-hover>
            </v-container>

        </v-main>
    </v-app>

    <!-- <site_footer></site_footer> -->
</template>

<script lang = ts setup>
 /* eslint-disable */ 
import $ from 'jquery'
import M from 'materialize-css'

import { animate, stagger, onScroll, text } from 'animejs';
import { useGoTo } from 'vuetify';
import { inject, onMounted, ref, type Ref } from 'vue';

const error: Function = inject('error')!;
const info: Function = inject('info')!;

const loading = ref(true);
const history = ref([
    {user: 'AI', time: '3:13 A.M.', text: 'ouob'},
    {user: 'user', time: '8:14 P.M.', text: 'ouob'},
]);
const rules = ref('');
const game = ref({
    faith: '',
    trial: '',
    category: '',
    strategy: '',
});
const load = ref({
    info: false,
    strategy: false
});
const goto = useGoTo();
const url = ref('https://api.ysh.xx.kg/');

onMounted(() => {
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
  init();
  animate('.loading', {
      filter: [
          {to: '0px', duration: 1000},
          {to: '50px', duration: 1000}
      ],
      loop: true,
      ease: 'inOutCirc'
  })
})

const init = () => {
    $.ajax({
        url: url.value + '/beat',
        type: 'POST',
        timeout: 3000,
        data: {}
    }).done((response) => {
        info(JSON.stringify(response));
    }).fail(() => {
        error('Server down')
    }).always(() => loading.value = false)
}
const submit_rules = () => {
    if(rules.value == '') {
        error('請填入規則');
        return;
    }
    load.value.info = true;
    $.ajax({
        url: url.value + '/game/get_category',
        type: 'POST',
        data: {
            rules: rules.value
        },
        timeout: 300000
    }).done((response) => {
        console.log(response);
        if(check_response(response)) return;
        game.value = response.data;
        get_strategy();
        goto('#info');
    }).always(() => load.value.info = false)
}
const check_response = (response: any) => {
    if(!response['ok']) {
        error('ERROR Found: ' + response['error']);
        return 1;
    }
    return 0;
}
const get_strategy = () => {
    console.log('1');
    load.value.strategy = true;
    $.ajax({
        type: 'POST',
        url: url.value + '/game/get_strategy',
        data: {
            rules: rules.value
        },
        timeout: 5 * 60 * 1000
    }).done((response) => {
        if(check_response(response)) return;
        game.value.strategy = response.data;
    }).always(() => load.value.strategy = false)
}
</script>

<style>
* {
  transition: .3s all;
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
</style>