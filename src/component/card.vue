<script setup>
import { ref } from 'vue'

const {
    highlight = {
        title: '',
        description: '',
        thumbnails: []
    },
    content = {
        text: '',
        author: ''
    }
} = defineProps(['highlight', 'content'])

const hl = ref(true)

</script>

<template>
    <div style="width: 60vw;">
        <h1 v-html="highlight?.title"></h1>
        <div v-if="hl" @click="hl = false">
            <div v-html="highlight?.description"></div>
            <div v-for="img in highlight?.thumbnails"><img :src="img"></div>
        </div>
        <div v-else v-html="content?.text" @click="hl = true"></div>
        <h5 v-if="content.author">{{ 'by ' + content?.author }}</h5>
    </div>
</template>