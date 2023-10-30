import type { Chapter, ResponseChapters, SurveyResponse, Demographic } from "./types";

const backendHost = import.meta.env.VITE_BACKEND_HOST;

async function getFetcher(url: string) {
    return await fetch(url).then((response) => {
        return response.json();
    })
}

async function postFetcher(url: string, body: any) {
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then((response) => {
        return response.json();
    });
}

const chapter = {
    getAll: async function(): Promise<{success: boolean, data: Array<Chapter>}> {
        return await getFetcher(backendHost + "/chapter");
    }
}

const demographic = {
    getAll: async function(): Promise<{success: boolean, data: Array<Demographic>}> {
        return await getFetcher(backendHost + "/demographic");
    }
}

const response = {
    getAvailableCode: async function(): Promise<{success: boolean, data: SurveyResponse}> {
        return await getFetcher(backendHost + "/code");
    },

    getResponse: async function(code: string): Promise<{success: boolean, data: { response: SurveyResponse, responseChapters: Array<ResponseChapters>}}> {
        return await getFetcher(backendHost + "/response/" + code);
    },

    setResponse: async function(responseData: SurveyResponse, responseChaptersData: Array<ResponseChapters>): Promise<{success: boolean, data?: SurveyResponse, error?: Error}> {
        return await postFetcher(backendHost + "/response", {
            code: responseData.code,
            responseChaptersData
        });
    }
}

export { chapter, response, demographic }
