<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/models/store'

const store = useStore()
const router = useRouter()

function goRandomChapter() {
    const chapters = store.chapters
    const randomChapter = chapters[Math.floor(Math.random()*chapters.length)];

    store.currentChapter = randomChapter
    return router.push('/read')
}

function goChapters() {
    store.currentChapter = undefined
    return router.push('/chapters')
}
</script>

<template>
    <footer class="read-footer">
        <nav>
            <a href="#" @click.prevent="goRandomChapter()">Next random chapter</a>
            <a href="#" @click.prevent="goChapters()" v-if="store.currentChapter">Chapter index</a>
        </nav>
    </footer>
</template>