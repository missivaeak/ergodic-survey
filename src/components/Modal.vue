<script setup lang="ts">
    defineProps(['header', 'content', 'button', 'type'])
</script>

<template>
    <div id="modal" class="modal-overlay">
        <div class="modal">
            <h3>{{ header }}</h3>
            <div class="content" v-html="content"></div>
            <button class="submit-btn" @click="$emit('hideModal')">{{ button }}</button>
        </div>
    </div>
</template>
