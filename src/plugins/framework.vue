<template>
    <v-snackbar-queue v-model = 'toast' total-visible = 5 />
    <layout>
        <router-view />
    </layout>
</template>

<script lang="ts" setup>
    import { onMounted, provide, ref, type Ref } from 'vue';
import Layout from './layout.vue';

    // Properties for other general modules
    const inited = ref(false);
    const loading = ref(false);
    provide('loading', loading);
    provide('inited', inited);
    
    // General function
    const toast: Ref<{[id: string]: any}[]> = ref([]);

    const error = (error: string) => {
        toast.value.push({
            text: error,
            prependIcon: 'mdi-alert',
            color: 'pink',
            timer: 'bottom'
        })
    }

    const info = (x: string) => {
        toast.value.push({
            text: x,
            prependIcon: 'mdi-check-circle',
            color: 'teal',
            timer: 'bottom'
        })
    }
    
    provide('error', error);
    provide('info', info);
    provide('toast', toast);

    // toast API
    const qerror = (x: string) => {
        localStorage.setItem('message_queue', x);
        localStorage.setItem('message_type', 'error');
    }
    const qinfo = (x: string) => {
        localStorage.setItem('message_queue', x);
        localStorage.setItem('message_type', 'info');
    }
    onMounted(() => {
        const message = localStorage.getItem('message_queue');
        if(message == null) return;
        const type = localStorage.getItem('message_type');

        localStorage.removeItem('message_queue');
        localStorage.removeItem('message_type');

        switch(type) {
            case 'error':
                error(message);
                break;
            case 'info':
                info(message);
                break;
            default:
                info(message);
        }
    })
    const kick = (x: string) => {
        qerror(x);
        location.href = '/';
    }
    provide('qerror', qerror);
    provide('kick', kick);
    provide('qinfo', qinfo);

    // localStorage API
    const save: Function = (name: string, x: any) => {
        localStorage.setItem(name, x);
    }
    const get: Function = (name: string) => {
        return localStorage.getItem(name);
    }
    provide('save', save);
    provide('get', get);

    // Requests Parser
    const check = (response: any, err: boolean = false) => {
        if(err) {
            if(response.responseText != null) error(JSON.parse(response.responseText)?.error);
            else error(`Request Failed`);
            return;
        }
        if(!('ok' in response)) return false;
        if(!response.ok) {
            if('error' in response) error(response.error);
            return false;
        }

        return response.data;
    }
    provide('check', check);

    // Constants
    const url: Function = (x: string) => `http://localhost:12345/${x}`;
    provide('url', url);
</script>