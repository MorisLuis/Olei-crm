import { api } from "@/api/api";


export const getResponseAgent = async (prompt: string) => {
    const { data } = await api.post('/api/ai', {
        "prompt": prompt
    });

    return {
        data: data.data.data,
        headers: data.data.headers
    }
}