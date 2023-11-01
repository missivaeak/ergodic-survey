<script setup lang="ts">
    import { ref } from 'vue'
    import { RouterView } from 'vue-router'
    import { useDark } from '@vueuse/core'

    import DevBox from './components/DevBox.vue';
    import Modal from './components/Modal.vue';
    import LoadingSpinner from './components/LoadingSpinner.vue';

    useDark()

    const spinnerActive = ref(false)
    const modalActive = ref(false)
    const modalData = ref()

    function showModal(event: { header: string, content: string, button: string, type: string, data?: any }) {
        modalActive.value = true
        modalData.value = event
    }

    function showSpinner(bool: boolean) {
        spinnerActive.value = bool
    }
</script>

<template>
    <RouterView @show-modal="showModal" @show-spinner="showSpinner" />
    <DevBox @show-modal="showModal" @show-spinner="showSpinner" />
    <LoadingSpinner v-if="spinnerActive" />
    <Modal v-if="modalActive" @hide-modal="modalActive = false" v-bind="modalData" />
</template>
