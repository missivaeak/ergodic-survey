<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

import DevBox from '@/components/DevBox.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <main class="welcome">
    <h1>Welcome</h1>
    <p>
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    </p>

    <p class="right-align"><RouterLink to="/login">Continue</RouterLink></p>
  </main>

  <DevBox />
</template>
