import { api } from "@/api/api";


export const getMeetingById = async (id: string) => {

    try {
        const data  = await api.get(`/api/meetings/${id}`)
        return data.data
    } catch (error) {
        return { error: error };
    }

}