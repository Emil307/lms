import dayjs from "dayjs";
import { UpdateScheduleFromGroupRequest } from "@entities/group";
import { UpdateScheduleFormValidation } from "./types";

export const adaptUpdateScheduleFormRequest = (
    data: UpdateScheduleFormValidation & { scheduleId: number }
): UpdateScheduleFromGroupRequest => {
    return {
        scheduleId: data.scheduleId,
        scheduleDate: dayjs(data.scheduleDate).format("YYYY-MM-DD"),
        scheduleTimings: data.scheduleTimings.map((timing) => ({
            ...timing,
            from: dayjs(timing?.from).format("YYYY-MM-DD HH:mm:ssZ"),
            to: dayjs(timing?.to).format("YYYY-MM-DD HH:mm:ssZ"),
        })),
    };
};
