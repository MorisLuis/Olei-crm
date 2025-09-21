import { useState } from "react";
import useErrorHandler, { ErrorResponse } from "@/hooks/useErrorHandler";
import MeetingInterface from "@/interface/meeting";
import { updateMeeting } from "@/services/bitacora/meeting.service";

export function useUpdateStatus(refetch: () => void) : {   handleUpdateStatus: (item: MeetingInterface, e?: React.MouseEvent<HTMLDivElement>) => Promise<void>; loadingStatus: Record<number, boolean> } {
    const [loadingStatus, setLoadingStatus] = useState<Record<number, boolean>>({});
    const { handleError } = useErrorHandler();

    const handleUpdateStatus = async (
        item: MeetingInterface,
        e?: React.MouseEvent<HTMLDivElement>
    ) : Promise<void> => {
        e?.stopPropagation();
        if (loadingStatus[item.Id_Bitacora]) return;

        setLoadingStatus((prev) => ({ ...prev, [item.Id_Bitacora]: true }));

        try {
            await updateMeeting({ status: !item.status }, item.Id_Bitacora);
            refetch();
        } catch (error) {
            handleError({
                message: (error as ErrorResponse)?.message,
                response: (error as ErrorResponse)?.response,
            });
        } finally {
            setTimeout(() => {
                setLoadingStatus((prev) => ({ ...prev, [item.Id_Bitacora]: false }));
            }, 500);
        }
    };

    return { handleUpdateStatus, loadingStatus };
}
