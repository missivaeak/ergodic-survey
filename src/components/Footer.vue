<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/models/store'

const store = useStore()
const router = useRouter()

function goRandomChapter() {
    const chapters = store.unviewedChapters
    const randomChapter = chapters[Math.floor(Math.random()*chapters.length)];

    store.currentChapter = randomChapter
    store.setViewed(true)
    return router.push('/read')
}

function goChapters() {
    store.unsetCurrentChapter()
    return router.push('/chapters')
}
</script>

<template>
    <footer class="read-footer">
        <nav>
            <a href="#" @click.prevent="goRandomChapter()" v-if="store.unviewedChapters.length">Random unread chapter</a>
            <a href="#" @click.prevent="goChapters()" v-if="store.currentChapter">Chapter index</a>
        </nav>
    </footer>
</template>