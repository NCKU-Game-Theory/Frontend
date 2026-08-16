<template>
    <v-row>
        <div id = token class = text-center> Using token: <v-chip> {{ token }} </v-chip> </div>
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
import { $ } from 'jquery';
import { type Ref, computed, inject, onMounted, ref, watch } from 'vue';

const token = defineModel<string | null>();

const url: Function = inject('url')!;
const check: Function = inject('check')!;

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
    loading.value = true;
    history.value.push({
        role: 'user',
        content: input.value
    })
    $.ajax({
        url: url('chat/ask'),
        method: 'POST',
        data: {
            message: input.value,
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
        input.value = history.value[history.value.length - 1].content
        history.value.pop();
    }).always(() => loading.value = false);
}

const init = () => {
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

onMounted(init);
watch(token, (alt, neu) => init())
</script>

<style>
#token {
    width: 100%;
    color: gray;
    font-size: small;
    font-style: italic;
}
</style>