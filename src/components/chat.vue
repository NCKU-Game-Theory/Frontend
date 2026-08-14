<template>
    <v-row>
        <v-col v-for = 'i, j in model' :key = j>
            {{ i.text }}
        </v-col>
    </v-row>
</template>

<script lang = ts setup>
import { type hs } from '@/pages/index.vue';
import { computed, toRef } from 'vue';

const model = defineModel<hs[]>();
</script>