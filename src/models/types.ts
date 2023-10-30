interface ResponseChapters {
    ResponseId: number,
    ChapterId: number,
    time: number,
    viewed: boolean,
    checked: boolean,
    createdAt?: string,
    updatedAt?: string
}

interface Chapter {
    id: number,
    title: string,
    content: string,
    createdAt?: string,
    updatedAt?: string,
    ResponseChapters?: ResponseChapters
}

interface SurveyResponse {
    id: number,
    code: string,
    pending: boolean,
    createdAt?: string,
    updatedAt?: string,
    Chapters?: Array<Chapter>
}

interface Demographic {
    id: number,
    question: string,
    description: string,
    type: string,
    label: string,
    questionAlternatives: Array<string>,
    createdAt?: string,
    updatedAt?: string
}

export type { Chapter, SurveyResponse, ResponseChapters, Demographic }
