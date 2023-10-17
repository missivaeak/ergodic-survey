<script setup lang="ts">
import { ref } from 'vue'
import bcrypt from 'bcryptjs'
import { useDark, useToggle } from '@vueuse/core'

import DevBox from '@/components/DevBox.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const code = ref('')

async function submitLogin() {
  const codeHash = await bcrypt.hash(code.value, 10)
  console.log(codeHash)
}
</script>

<template>
  <main class="login">
    <h2>Choose one option</h2>
    <div class="wrapper">
      <div class="login-col">
        <p>
          Claim a code and start the survey. Write down your code to be able to continue reading on
          another device at a later time, or...
        </p>
        <form @submit.prevent="submitLogin">
          <input class="submit-btn" type="submit" value="Get code" />
        </form>
      </div>

      <hr class="divider-v" />

      <div class="login-col">
        <p>...if you have a code you can enter it to continue reading.</p>
        <form @submit.prevent="submitLogin">
          <div class="input-box">
            <input type="number" v-model="code" required />
            <label>Code</label>
          </div>
          <input class="submit-btn" type="submit" value="Continue reading" />
        </form>
      </div>
    </div>
  </main>

  <DevBox />
</template>
