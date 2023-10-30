<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import TitleHeader from '@/components/TitleHeader.vue'
import Footer from '@/components/Footer.vue'
import { useStore } from '@/models/store'

const router = useRouter()
const store = useStore()
const viewedChapters = ref(store.viewedChapters)
const unviewedChapters = ref(store.unviewedChapters)
const emit = defineEmits(['showSpinner'])

emit('showSpinner', false)
store.fetchChapters()

watch(
    store.$state,
    (state) => {
        store.chapters = state.chapters
        // viewedChapters.value = store.viewedChapters
        // unviewedChapters.value = store.unviewedChapters
    }
)

function goChapter(chapterId: number) {
    emit('showSpinner', true)
    store.currentChapter = store.getChapter(chapterId)
    store.setViewed(true)

    return router.push('/read')
}
</script>

<template>
    <div class="read-wrapper">
        <TitleHeader />

        <main class="read">
            <div class="unviewed">
                <p>Unread</p>
                <p v-for="chapter in unviewedChapters">
                    <a href="#" @click.prevent="goChapter(chapter.id)">{{ chapter.title }}</a>
                </p>
            </div>
            <div class="viewed">
                <p>Read:</p>
                <p v-for="chapter in viewedChapters">
                    <a href="#" @click.prevent="goChapter(chapter.id)">{{ chapter.title }}</a>
                </p>
            </div>
        </main>

        <Footer />
    </div>
</template>
