<script setup lang="ts">
    import { ref } from 'vue'
    import { RouterView } from 'vue-router'
    import { useDark } from '@vueuse/core'

    import DevBox from './components/DevBox.vue';
    import Modal from './components/Modal.vue';
    import { useStore } from '@/models/store'

    useDark()

    const modalActive = ref(false)
    const modalData = ref()

    function showModal(event: { header: string, content: string, button: string, type: string, data?: any }) {
        modalActive.value = true
        modalData.value = event
    }
</script>

<template>
    <RouterView @show-modal="showModal" />
    <DevBox @show-modal="showModal" />
    <Modal v-if="modalActive" @hide-modal="modalActive = false" v-bind="modalData" />
</template>
