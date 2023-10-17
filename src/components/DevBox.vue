<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="dev-box">
    <p>Will be removed</p>
    <RouterLink to="/">Welcome</RouterLink><br />
    <RouterLink to="/login">Login</RouterLink><br />
    <RouterLink to="/response">Response</RouterLink><br />
    <RouterLink to="/read">Read</RouterLink><br />
    <RouterLink to="/chapters">Chapters</RouterLink><br />
    <a href="#" @click.prevent="toggleDark()">{{ isDark ? 'Light' : 'Dark' }} mode</a>
  </div>
</template>
