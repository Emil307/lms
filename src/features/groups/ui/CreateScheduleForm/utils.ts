import dayjs from "dayjs";
import { AddScheduleToGroupRequest } from "@entities/group";
import { CreateScheduleFormValidation } from "./types";

export const adaptCreateScheduleFormRequest = (data: CreateScheduleFormValidation): AddScheduleToGroupRequest => {
    return {
        scheduleDate: dayjs(data.scheduleDate).format("YYYY-MM-DD"),
        scheduleTimings: data.scheduleTimings.map((timing) => ({
            from: dayjs(timing?.from).format("YYYY-MM-DD HH:mm:ssZ"),
            to: dayjs(timing?.to).format("YYYY-MM-DD HH:mm:ssZ"),
        })),
    };
};
