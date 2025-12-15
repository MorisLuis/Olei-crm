import { api } from "@/api/api";


export const getResponseAgent = async (prompt: string) => {
    const { data } = await api.post('/api/ai', {
        "prompt": prompt
    });

    return {
        data: data.data.data,
        headers: data.data.headers,
        queryId: data.data.queryId
    }
}


export const exportAgentData = async (queryId: string) => {
    const response = await api.get(`/api/ai/export?queryId=${queryId}`, {
        responseType: "blob",
    });

    return response.data;
};
