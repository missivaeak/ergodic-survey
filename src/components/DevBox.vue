<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const emit = defineEmits(['showSpinner', 'showModal'])

function testSpinner() {
    emit('showSpinner', true)
    setTimeout(() => {
        emit('showSpinner', false)
    }, 1000)
}
</script>

<template>
    <div class="dev-box">
        <p>Will be removed</p>
        <RouterLink to="/">Welcome</RouterLink><br>
        <RouterLink to="/login">Login</RouterLink><br>
        <RouterLink to="/response">Response</RouterLink><br>
        <RouterLink to="/read">Read</RouterLink><br>
        <RouterLink to="/chapters">Chapters</RouterLink><br>
        <a href="#" @click.prevent="toggleDark()">{{ isDark ? 'Light' : 'Dark' }} mode</a><br>
        <a href="#" @click.prevent="$emit('showModal', {
            header: 'Success!',
            content: '<p>This is a test modal.</p><p>Enjoy!</p>',
            button: 'Close',
            type: 'code-success'
        })">Show modal</a><br>
        <a href="#" @click.prevent="testSpinner">Show spinner</a>
    </div>
</template>
