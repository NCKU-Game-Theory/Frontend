<template>
    <v-row>
        <v-col cols = 12 class = 'd-flex align-center justify-space-between'>
            <div id = token class = text-left> Using token: <v-chip> {{ token }} </v-chip> </div>
            <v-btn
                v-if = token
                color = primary
                variant = tonal
                size = small
                prepend-icon = mdi-check-all
                :loading = loading
                @click = finalize
                text = 'Finalize'
            />
        </v-col>
        <v-divider />
        <v-text-field v-model = input @keydown.enter = 'submit' label = 'Text LLM...' />
        <v-col cols = 12 v-for = 'i, j in reversed_history' :key = j>
            <v-card
                :title = i.role
                :text = i.content
                variant = outlined
                v-ripple

                :class = 'align(i.role)'
            />
        </v-col>
    </v-row>
</template>

<script lang = ts setup>
import $ from 'jquery';
import { type Ref, computed, inject, onMounted, ref, watch } from 'vue';

const token = defineModel<string | null>();

const url: Function = inject('url')!;
const check: Function = inject('check')!;
const info: Function = inject('info')!;

const loading: Ref<boolean> = inject('loading')!;

interface message {
    role: 'system' | 'assistant' | 'user',
    content: string
}

const reversed_history = computed(() => [...history.value].reverse())
const history: Ref<message[]> = ref([]);
const input: Ref<string> = ref('');

const align = (x: 'user' | 'system' | 'assistant') => {
    const pre = {
        user: 'text-right',
        system: 'text-center',
        assistant: 'text-left'
    }

    return pre[x] || '123';
}

const submit = () => {
    if(!input.value) return;
    loading.value = true;
    const msg = input.value;
    history.value.push({
        role: 'user',
        content: msg
    })
    input.value = '';
    $.ajax({
        url: url('chat/ask'),
        method: 'POST',
        data: {
            message: msg,
            token: token.value
        },
        timeout: 300000
    }).done((response) => {
        var res = check(response);
        if(!res) return;
        history.value.push({
            role: 'assistant',
            content: res as string
        });
    }).fail((err) => {
        check(err, true);
        input.value = msg;
        history.value.pop();
    }).always(() => loading.value = false);
}

const init = () => {
    if(!token.value) return;
    loading.value = true;
    $.ajax({
        url: url('chat/history'),
        timeout: 3000,
        method: 'GET',
        data: {
            token: token.value
        }
    }).done((response) => {
        var res = check(response);
        if(!res) return;

        history.value = res as message[];
    }).fail((err) => {
        check(err, true);
    }).always(() => loading.value = false);
}

const finalize = () => {
    if(!token.value) return;
    loading.value = true;
    $.ajax({
        url: url('chat/finalize'),
        timeout: 300000,
        method: 'POST',
        data: {
            token: token.value
        }
    }).done((response) => {
        var res = check(response);
        if(!res) return;
        info(`Game finalized! Performance rating: ${res.rate ?? 'N/A'}/10`);
        if(res.summary) {
            history.value.push({
                role: 'system',
                content: `[Summary]\n${res.summary}\n\n[Rating]: ${res.rate ?? 'N/A'}/10`
            });
        }
    }).fail((err) => {
        check(err, true);
    }).always(() => loading.value = false);
}

onMounted(init);
watch(token, () => init())
</script>

<style>
#token {
    width: 100%;
    color: gray;
    font-size: small;
    font-style: italic;
}
</style>