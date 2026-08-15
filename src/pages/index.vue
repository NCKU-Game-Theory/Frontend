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
            <v-dialog v-model = popup.model id = rule>
                <template #default = '{isActive}'>
                    <v-container>
                        <div class = blur />
                        <v-card>
                            <div id = models class = text-center>
                                <v-chip v-for = 'i, j in models' :key = j class = ma-3 :variant = 'model == i ? undefined : `outlined`' @click = 'model = i; info(model)'> {{ i }} </v-chip>
                            </div>
                            <v-divider />
                            <cartn @click = 'isActive.value = false; blur(`#model`)' title = 'Apply' :text = 'model ? `You have selected ${model} as your model` : `You have not chosen any model`'></cartn>
                        </v-card>
                    </v-container>
                </template>
            </v-dialog>

            <v-container>
                <v-row>
                    <v-col><cartn @click = 'popup.rule = true' title = 'Setup Rules' icon = mdi-ruler /></v-col>
                    <v-col><cartn @click = 'popup.model = true' title = 'Select Model' icon = mdi-robot :subtitle = 'model ? model : undefined' /></v-col>
                    <v-col><cartn @click = 'memory = !memory' title = 'Memory' icon = mdi-brain :fixed = 'memory' /></v-col>
                </v-row>

                <v-row>
                    <chat v-model = history />
                </v-row>

                <v-row>
                    <v-col cols = 12 md = 11><v-text-field v-model = input variant = outlined label = 'Make some conversation...' /></v-col>
                    <v-col cols = 12 md = 1><v-btn icon = mdi-send @click = submit /></v-col>
                </v-row>
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

import Cartn from '@/components/cartn.vue';
import Chat from '@/components/chat.vue';

const error: Function = inject('error')!;
const info: Function = inject('info')!;

const save: Function = inject('save')!;
const get: Function = inject('get')!;

const popup = ref({
    rule: false,
    model: false
});

const loading: boolean = inject('loading')!;
const input = ref('');
const rule = ref('');

export interface hs {
    name: string,
    time: string | null,
    text: string
}

const history: Ref<hs[]> = ref([]);

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

const fake: Function = () => {
    return {
        text: input.value,
        name: '123',
        time: '12321'
    };
}

const submit: Function = () => {
    info('ouob');
    history.value.push(fake());
    input.value = '';
}

const models: Ref<string[]> = ref(['gemma3:12b', 'gemma3:4b']);
const model: Ref<string | null> = ref(null);
const memory: Ref<boolean> = ref(false);

</script>

<style>
/* .blur {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0px;
    left: 0px;
    background-color: rgba(255, 255, 255, .4);
    backdrop-filter: blur(10px);
    z-index: -1000;
} */
</style>