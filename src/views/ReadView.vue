<script setup lang="ts">
import { onUnmounted } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

import DevBox from '@/components/DevBox.vue'
import TitleHeader from '@/components/TitleHeader.vue'
import Footer from '@/components/Footer.vue'

import { useStore } from '@/models/store'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const store = useStore()

clearInterval(store.interval)
store.interval = setInterval(() => {
    store.addSecond()
}, 1000)

onUnmounted(() => {
    clearInterval(store.interval)
    store.pushResponse()
})

</script>

<template>
    <div class="read-wrapper">
        <TitleHeader />

        <main class="read">
            <span v-html="store.currentChapter?.content" />
        </main>

        <Footer />
    </div>
</template>
