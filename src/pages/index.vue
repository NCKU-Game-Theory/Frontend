<template>
    <v-app>
        <page_loader :loading = 'loading' />
        <!-- <title_nav /> -->

        <v-main>

            <v-container>
                <v-dialog v-model = model.dialog id = rule>
                    <template #default = '{isActive}'>
                        <v-container>
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
                <v-row>
                    <v-col><cartn @click = 'model.dialog = true' title = 'Setup Rules' icon = mdi-ruler /></v-col>
                </v-row>
                <v-text-field v-model = input label = 123 />
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

const error: Function = inject('error')!;
const info: Function = inject('info')!;

const save: Function = inject('save')!;
const get: Function = inject('get')!;

const model = ref({
    dialog: false
});

const loading: boolean = inject('loading')!;
const input = ref('');
const rule = ref('');

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

</script>

<style>
</style>