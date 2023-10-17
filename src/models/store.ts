import { defineStore } from 'pinia'
import { chapter } from './api'
import type { Chapter } from './types';

export const useStore = defineStore('store', {
    state: () => ({
        chapters: [] as Array<Chapter>,
        currentChapter: undefined as Chapter | undefined
    }),
    getters: {
        headerTitle(state) {
            if (state.currentChapter) {
                return state.currentChapter.title;
            }

            return "Chapters";
        }
    },
    actions: {
        async fetchChapters() {
            this.chapters = await chapter.getAll();
        },
    },
})
