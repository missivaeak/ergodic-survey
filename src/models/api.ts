import type { Chapter } from "./types";

const backendHost = import.meta.env.VITE_BACKEND_HOST;

async function getFetcher(url: string) {
    return await fetch(url).then((response) => {
        return response.json();
    }).then((result) => {
        return result.data;
    });
}

const chapter = {
    getAll: async function(): Promise<Array<Chapter>> {
        return await getFetcher(backendHost + "/chapter");
    }
}

export { chapter }
