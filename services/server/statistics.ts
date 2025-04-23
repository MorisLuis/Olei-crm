import { api } from "@/api/api";
import { cookies } from "next/headers";

const getBriefCRM = async (): Promise<{
    eventsToday: number;
    sellsToday: number;
    eventsWeek: number;
    sellsWeek: number;
}> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("No auth token");

    const { data } = await api.get("/api/statistics/crm-brief", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return data;
};

export {
    getBriefCRM
}
