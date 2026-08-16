<template>
    <v-app>
        <page_loader :loading = 'loading' />
        <!-- <title_nav /> -->

        <v-main>
            <v-dialog v-model = popup.rule id = rule>
                <template #default = '{isActive}'>
                    <v-container>
                        <div class = blur />
                        <v-card>
                            <v-textarea v-model = rule label = 'Input rules here...' @change = 'save(`rule`, rule)' />
                            <v-hover>
                                <template #default = '{isHovering, props}'>
                                    <v-card class = 'ma-3 text-center' v-bind = props :color = 'isHovering ? `primary` : undefined' @click = 'isActive.value = false; blur(`#rule`); info(`Rule set`)' v-ripple title = 'Sure' subtitle = 'Save the rule and make it work' prepend-icon = 'mdi-check-circle' />
                                </template>
                            </v-hover>
                        </v-card>
                    </v-container>
                </template>
            </v-dialog>
            <v-dialog v-model = popup.model id = model>
                <template #default = '{isActive}'>
                    <v-container>
                        <div class = blur />
                        <v-card>
                            <div id = models class = text-center>
                                <v-chip v-for = 'i, j in models' :key = j class = ma-3 :variant = 'model == i ? undefined : `outlined`' @click = 'model = i; info(model)'> {{ i }} </v-chip>
                            </div>
                            <v-divider />
                            <cartn @click = 'isActive.value = false; blur(`#model`)' title = 'Apply' :text = 'model ? `You have selected ${model} as your model` : `You have not chosen any model`' icon = mdi-check-circle></cartn>
                        </v-card>
                    </v-container>
                </template>
            </v-dialog>

            <v-row>
                <v-col cols = 12 md = 3>
                    <v-row align = center>
                        <v-col>
                            <cartn
                                v-for = 'i, j in reversed_sessions'
                                :key = j
        
                                :title = 'i.title || i.rule'
                                :subtitle = '`model: ${i.model}, ` + (i.memory ? `with` : `without`) + ` memory`'
                                :text = '`${i.token} / ${i.rule}`'

                                :fixed = 'pointer == i.token'

                                @click = 'pointer = i.token'
                            />
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols = 12 md = 6 lg = 9 class = 'align-content-center wrapper'>
                    <v-row class = 'animate'>
                        <v-col cols = 12 md = 4><cartn @click = 'popup.rule = true' title = 'Setup Rules' icon = mdi-ruler :subtitle = 'rule == `` ? `Rule not set` : `Rule set`' /></v-col>
                        <v-col cols = 12 md = 4><cartn @click = 'popup.model = true' title = 'Select Model' icon = mdi-robot :subtitle = 'model ? model : `No model`' /></v-col>
                        <v-col cols = 12 md = 4><cartn @click = 'memory = !memory' title = 'Memory' icon = mdi-brain :fixed = 'memory' subtitle = 'Toggle memory' /></v-col>
                        <v-col cols = 12 :class = 'ok ? undefined : `disabled`'><cartn @click = 'init()' title = 'Start' icon = mdi-send subtitle = 'Start a new session' /></v-col>
                    </v-row>
                    <v-row v-if = pointer>
                        <chat v-model = pointer />
                    </v-row>
                </v-col>
            </v-row>

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
import { computed, inject, onMounted, ref, type Ref } from 'vue';

import Cartn from '@/components/cartn.vue';
import Chat from '@/components/chat.vue';

const error: Function = inject('error')!;
const info: Function = inject('info')!;

const save: Function = inject('save')!;
const get: Function = inject('get')!;

const url: Function = inject('url')!;
const check: Function = inject('check')!;

const ok = computed(() => ((rule.value != '') && (model.value !== null)));

const popup = ref({
    rule: false,
    model: false
});

const loading: Ref<boolean> = inject('loading')!;
const rule = ref('');

export interface hs {
    name: string,
    time: string | null,
    text: string
}

onMounted(() => {
    rule.value = get('rule') || '';
})

const blur: Function = (target: string, time: number = 1000) => {
    animate(target, {
        filter: [
            {from: 'blur(0px)', to: 'blur(100px)', duration: time - 1},
            {from: 'blur(100px)', to: 'blur(0px)', duration: 1}
        ],
        scale: 1.5,
        duration: time
    });
}

const models: Ref<string[]> = ref(['gemma3:12b', 'gemma3:4b', 'llama3.2:1b']);
const model: Ref<string | null> = ref(null);
const memory: Ref<boolean> = ref(false);

export interface session {
    token: string,
    rule: string,
    title: string | null,
    model: string,
    memory: boolean
}

const reversed_sessions = computed(() => [...sessions.value].reverse());
var sessions: Ref<session[]> = ref([]);
sessions.value = JSON.parse(get('sessions')) || [];

const pointer: Ref<string | null> = ref(null);

const set_rule = (token: string, rule: string, model: string, memory: boolean) => {
    info('set rules');
    loading.value = true;
    $.ajax({
        url: url('chat/rule'),
        timeout: 300000,
        method: 'POST',
        data: {
            token: token,
            rule: rule
        }
    }).done((response) => {
        const res = check(response);
        info(`Got Response from model: ${res.response}`);

        sessions.value.push({
            token, rule, title: res.response, model, memory
        })
        save('sessions', JSON.stringify(sessions.value));
    }).fail((err) => {
        check(err, true);
    }).always(() => {
        loading.value = false;
    })
}

const init: Function = () => {
    if(!ok.value) {
        error('Parameter not set');
        return;
    }
    loading.value = true;
    $.ajax({
        url: url('token/init'),
        timeout: 3000,
        method: 'GET'
    }).done((response) => {
        const res = check(response);
        if(!res) error(`Failed, error = ${response.error}`);
        info(`Got token ${res}`);
        const token: string = res;
        set_rule(token, rule.value, model.value!, memory.value);
    }).fail((err) => {
        check(err, true);
        loading.value = false;
    })
}

</script>

<style>
.disabled {
    filter: blur(10px);
}
.animate {
    transition: all .7s;
}
.wrapper {
    height: 100vh;
}
</style>