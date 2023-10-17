<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { ref } from 'vue'

import DevBox from '@/components/DevBox.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const seeDisclaimer = ref(true)
const sliderValue = ref(4)

function goAccept() {
  seeDisclaimer.value = false
}
</script>

<template>
  <main class="welcome" v-if="seeDisclaimer">
    <h1>Disclaimer</h1>
    <p>
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    </p>
    <p class="right-align"><a href="./" @click.prevent="goAccept">Accept</a></p>
  </main>

  <main class="response" v-else="seeDisclaimer">
    <h1>Demographics and experience</h1>

    <form>
      <p>This is a short description of the question.</p>

      <div class="input-box">
        <input type="text" required />
        <label>Text box</label>
      </div>

      <hr class="divider" />

      <p>This is a short description of the question.</p>

      <div class="input-box">
        <input type="number" required />
        <label>Number box</label>
      </div>

      <hr class="divider" />

      <p>This is a short description of the question.</p>

      <div class="input-box-checkbox">
        <label>Checkboxes</label>
        <input type="checkbox" />
        <label>First</label>
        <input type="checkbox" />
        <label>Second</label>
        <input type="checkbox" />
        <label>Third</label>
      </div>

      <hr class="divider" />

      <p>This is a short description of the question.</p>

      <div class="input-box-checkbox">
        <label>Radio buttons</label>
        <input type="radio" name="radio" />
        <label>First</label>
        <input type="radio" name="radio" />
        <label>Second</label>
        <input type="radio" name="radio" />
        <label>Third</label>
      </div>

      <hr class="divider" />

      <p>This is a short description of the question.</p>

      <div class="input-box">
        <select>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
          <option>Option 4</option>
        </select>
        <label>Drop-down</label>
      </div>

      <hr class="divider" />

      <p>This is a short description of the question.</p>

      <p>Slider</p>
      <div class="input-box">
        <input type="range" min="1" max="7" step="1" v-model="sliderValue" />
        <label>Value: {{ sliderValue }}</label>
      </div>
    </form>

    <p class="right-align"><RouterLink to="/read">Start reading</RouterLink></p>
  </main>

  <DevBox />
</template>
