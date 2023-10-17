<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useRouter } from 'vue-router'

import DevBox from '@/components/DevBox.vue'
import TitleHeader from '@/components/TitleHeader.vue'
import Footer from '@/components/Footer.vue'
import { useStore } from '@/models/store'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const router = useRouter()
const store = useStore()
const chapters = ref(store.chapters)

store.fetchChapters()

watch(
    store.$state,
    (state) => {
        chapters.value = state.chapters
    }
)

function goChapter(index: number) {
    store.currentChapter = store.chapters[index]

    return router.push('/read')
}
</script>

<template>
    <div class="read-wrapper">
        <TitleHeader />

        <main class="read">
            <p v-for="(chapter, index,) in chapters">
                <a href="#" @click.prevent="goChapter(index)">{{ chapter.title }}</a>
            </p>
        </main>

        <Footer />

        <DevBox />
    </div>
</template>
