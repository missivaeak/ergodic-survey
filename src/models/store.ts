import { defineStore } from 'pinia'
import { chapter as chapterModel, response as responseModel } from './api'
import type { Chapter, SurveyResponse, ResponseChapters } from './types';

export const useStore = defineStore('store', {
    state: () => ({
        chapters: [] as Array<Chapter>,
        currentChapter: undefined as Chapter | undefined,
        responseState: undefined as SurveyResponse | undefined,
        responseChaptersState: undefined as Array<ResponseChapters> | undefined,
        interval: undefined as NodeJS.Timeout | undefined
    }),
    getters: {
        headerTitle(state) {
            if (state.currentChapter) {
                return state.currentChapter.title;
            }

            return "Chapters";
        },

        viewedChapters() {
            const viewedChapters = [] as Array<Chapter>;

            if (!this.responseChaptersState) {
                return viewedChapters;
            }

            for (const chapterResponse of this.responseChaptersState) {
                if (chapterResponse.viewed) {
                    for (const chapter of this.chapters) {
                        if (chapter.id === chapterResponse.ChapterId) {
                            viewedChapters.push(chapter)
                        }
                    }
                }
            }

            return viewedChapters;
        },

        unviewedChapters() {
            const unviewedChapters = [] as Array<Chapter>;

            if (!this.responseChaptersState) {
                return unviewedChapters;
            }

            for (const chapterResponse of this.responseChaptersState) {
                if (!chapterResponse.viewed) {
                    for (const chapter of this.chapters) {
                        if (chapter.id === chapterResponse.ChapterId) {
                            unviewedChapters.push(chapter)
                        }
                    }
                }
            }

            return unviewedChapters;
        }
    },
    actions: {
        async fetchChapters(): Promise<Array<Chapter>> {
            this.chapters = (await chapterModel.getAll()).data;

            return this.chapters;
        },

        getChapter(chapterId: number): Chapter | undefined {
            for (const chapter of this.chapters) {
                if (chapter.id === chapterId) {
                    return chapter
                }
            }

            return
        },

        async pullResponse(code: string): Promise<SurveyResponse> {
            const data = (await responseModel.getResponse(code)).data;

            this.responseState = data.response || undefined
            this.responseChaptersState = data.responseChapters || undefined

            return this.responseState;
        },

        async pushResponse(): Promise<boolean> {
            try {
                await responseModel.setResponse(
                    this.responseState as SurveyResponse,
                    this.responseChaptersState as Array<ResponseChapters>
                );

                return true;
            } catch(error) {
                console.error(error);

                return false;
            }
        },

        unsetCurrentChapter(): void {
            this.currentChapter = undefined;
        },

        addSecond(): void {
            let time;

            if (!this.chapters || !this.currentChapter || !this.responseState || !this.responseChaptersState ) {
                return
            }

            this.responseState.Chapters = this.responseState.Chapters || [ this.currentChapter ]

            for (const responseChapter of this.responseChaptersState) {
                if (responseChapter.ChapterId === this.currentChapter.id && this.responseChaptersState) {
                    time = responseChapter.time++
                    break
                }
            }

            if (time && time % 10 === 0) {
                this.pushResponse()
            }
        },

        setViewed(viewed: boolean): void {
            if (!this.currentChapter) {
                return
            }

            const chapterId = this.currentChapter.id

            this.responseChaptersState?.forEach((responseChapters) => {
                if (responseChapters.ChapterId === chapterId) {
                    responseChapters.viewed = viewed
                }
            })

            this.pushResponse()
        },

        setChecked(checked: boolean): void {
            if (!this.currentChapter) {
                return
            }

            const chapterId = this.currentChapter.id

            this.responseChaptersState?.forEach((responseChapters) => {
                if (responseChapters.ChapterId === chapterId) {
                    responseChapters.checked = checked
                }
            })

            this.pushResponse()
        }
    },
})
