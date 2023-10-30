<script setup lang="ts">
    import { ref } from 'vue'
    import { demographic } from '@/models/api'
    import type { Ref } from 'vue'
    import type { Demographic } from '@/models/types'

    const seeDisclaimer = ref(true)
    const values = ref([]) as Ref<Array<any>>
    const questions = ref([]) as Ref<Array<Demographic>>

    demographic.getAll().then((result) => {
        try {
            questions.value = result.data
        } catch(error) {
            console.error(error)
        }

        for (const question of questions.value) {
            if (question.type === 'slider') {
                values.value[question.id] = 0
                continue
            }
            values.value[question.id] = ""
        }
    })

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
            <template v-for="(question, index) in questions">
                <p>{{question.question}}</p>

                <template v-if="question.type === 'text'">
                    <div class="input-box">
                        <input type="text" required v-model="values[question.id]" />
                        <label>{{ question.label }}</label>
                    </div>
                </template>

                <template v-if="question.type === 'number'">
                    <div class="input-box">
                        <input type="number" required v-model="values[question.id]" />
                        <label>{{ question.label }}</label>
                    </div>
                </template>

                <template v-if="question.type === 'checkbox'">
                    <div class="input-box-checkbox">
                        <label>{{ question.label }}</label>
                        <template v-for="alt in question.questionAlternatives">
                            <input type="checkbox" v-model="values[question.id]" :value="alt" />
                            <label>{{ alt }}</label>
                        </template>
                    </div>
                </template>

                <template v-if="question.type === 'radio'">
                    <div class="input-box-checkbox">
                        <label>{{ question.label }}</label>
                        <template v-for="alt in question.questionAlternatives">
                            <input type="radio" v-model="values[question.id]" :value="alt" />
                            <label>{{ alt }}</label>
                        </template>
                    </div>
                </template>

                <template v-if="question.type === 'dropdown'">
                    <div class="input-box">
                        <select v-if="question.type === 'dropdown'" v-model="values[question.id]">
                            <template v-for="(alt, jndex) in question.questionAlternatives">
                                <option :value="alt" selected v-if="jndex === 1">{{ alt }}</option>
                                <option :value="alt" v-else>{{ alt }}</option>
                            </template>
                        </select>
                        <label>{{ question.label }}</label>
                    </div>
                </template>

                <template v-if="question.type === 'slider'">
                    <div class="input-box">
                        <input type="range" min="1" max="7" step="1" v-model="values[question.id]" />
                        <label>{{ question.label }}</label>
                        <label class="slider-value">{{ values[question.id] }}</label>
                    </div>
                </template>

                <hr class="divider" v-if="index < questions.length - 1" />
            </template>
        </form>

        <p class="right-align"><RouterLink to="/read">Start reading</RouterLink></p>
    </main>
</template>
