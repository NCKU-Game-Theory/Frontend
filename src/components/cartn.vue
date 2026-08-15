<template>
    <v-hover>
        <template #default = '{isHovering, props}'>
            <v-card class = 'ma-3 text-center'
            v-bind = props
            :color = 'isHovering || fixed ? color : undefined'
            :text = text
            :title = title
            :subtitle = subtitle
            :prepend-icon = icon
            @click = '$emit(`click`)'
            v-ripple
        />
            <v-slot />
        </template>
    </v-hover>
</template>

<script lang = ts setup>
    defineEmits(['click']);
    defineProps({
        color: {
            type: String,
            default: 'primary'
        },
        text: String,
        title: String,
        subtitle: String,
        icon: String,
        fixed: {
            type: Boolean,
            default: false
        }
    })
</script>