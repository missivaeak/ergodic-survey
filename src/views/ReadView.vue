<script setup lang="ts">
import { ref, provide } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useRoute } from 'vue-router'

import DevBox from '@/components/DevBox.vue'
import TitleHeader from '@/components/TitleHeader.vue'
import Footer from '@/components/Footer.vue'

import { useStore } from '@/models/store'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const route = useRoute()
const seeIndex = route.meta.seeIndex
const store = useStore()

store.fetchChapters()

</script>

<template>
    <div class="read-wrapper">
        <TitleHeader />

        <main class="read">
            <span v-html="store.currentChapter?.content" />
        </main>

        <Footer />

        <DevBox />
    </div>
</template>
