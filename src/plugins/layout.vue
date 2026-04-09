<template>
    <v-app>
        <v-app-bar
        color = grey
        class = elevate
        scroll-behavior = 'collapse'
        elevate = 3
        
        rounded
        >
        <template #prepend>
            <v-app-bar-nav-icon>
                <a class = 'nodeco' href = '/'>
                    <v-progress-circular indeterminate v-if = loading />
                    <v-icon class = ma-1 v-else> mdi-toolbox </v-icon>
                </a>
            </v-app-bar-nav-icon>
            <v-app-bar-title>
                    <a class = 'nodeco' href = '/'>
                        <slot name = 'title'>
                            {{ title }}
                        </slot>
                    </a>
                </v-app-bar-title>
            </template>
        </v-app-bar>
        <v-main>
            <v-progress-linear :indeterminate = loading bg-color = transparent />
            <slot />
        </v-main>
    </v-app>
</template>

<script lang = ts setup>
    import { inject, type Ref } from 'vue';
    
    const error: Function = inject('error')!;
    const loading: Ref<boolean> = inject('loading')!;

    const props = defineProps({
        title: {
            type: String,
            default: "Sphinx"
        }
    })
</script>

<style>
body {
  background-color: white;
}
.v-card-title {
    font-weight: 900 !important;
}
.nodeco {
    text-decoration: none !important;
    color: inherit;
}
.v-app-bar {
    position: fixed !important;
}
.v-toolbar {
    backdrop-filter: blur(10px);
    background-color: rgba(150, 150, 150, .75);
}
.v-toolbar:hover {
    backdrop-filter: none;
    background-color: rgb(150, 150, 150);
}
</style>