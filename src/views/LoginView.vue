<script setup lang="ts">
    import { ref } from 'vue'
    import { useDark, useToggle } from '@vueuse/core'
    import { useRouter } from 'vue-router'

    import { useStore } from '@/models/store';
    import { response } from '@/models/api';
    import type { SurveyResponse } from '@/models/types';

    const emit = defineEmits(['showModal'])
    const store = useStore()
    const isDark = useDark()
    const toggleDark = useToggle(isDark)
    const router = useRouter()
    const existingCode = ref(localStorage.userCode)

    store.fetchChapters()

    async function submitRegister() {
        const result = await response.getAvailableCode()
        if (result.success) {
            store.responseState = result.data
            emit('showModal', {
                header: "Success!",
                content: `<p>Your code is ${result.data.code}. Save it or write it down to be able to continue reading on another device.</p>`,
                button: "Continue",
                type: "code-success"
            })
            goChapters()
        }
    }

    async function submitLogin() {
        const result = await response.getResponse(existingCode.value)
        if (result.success) {
            store.responseState = result.data.response
            goChapters()
        }
    }

    async function goChapters() {
        const code = store.responseState?.code
        if (typeof code == "string") {
            localStorage.userCode = code
            await store.pullResponse(code)
        }
        store.unsetCurrentChapter()
        router.push('/chapters')
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
                <form @submit.prevent="submitRegister">
                    <input class="submit-btn" type="submit" value="Get code" />
                </form>
            </div>

            <hr class="divider-v" />

            <div class="login-col">
                <p>...if you have a code you can enter it to continue reading.</p>
                <form @submit.prevent="submitLogin">
                    <div class="input-box">
                        <input type="number" v-model="existingCode" required />
                        <label>Code</label>
                    </div>
                    <input class="submit-btn" type="submit" value="Continue reading" />
                </form>
            </div>
        </div>
    </main>
</template>
