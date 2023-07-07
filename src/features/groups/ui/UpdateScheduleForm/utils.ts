import dayjs from "dayjs";
import { AdminGroupScheduleFromList, UpdateAdminGroupScheduleRequest } from "@entities/group";
import { UpdateScheduleFormValidation } from "./types";

export const adaptUpdateScheduleForm = (data?: AdminGroupScheduleFromList): Partial<UpdateScheduleFormValidation> => {
    return {
        scheduleDate: data?.date,
        scheduleTimings: data?.timings,
    };
};

export const adaptUpdateGroupScheduleRequest = (
    data: UpdateScheduleFormValidation,
): Omit<UpdateAdminGroupScheduleRequest, "groupId" | "scheduleId"> => {
    const { scheduleDate, scheduleTimings = [] } = data;
    return {
        scheduleDate: dayjs(scheduleDate).format("YYYY-MM-DD"),
        scheduleTimings: scheduleTimings.map((timing) => ({
            from: dayjs(timing.from).format("YYYY-MM-DD HH:mm:ssZ"),
            to: dayjs(timing.to).format("YYYY-MM-DD HH:mm:ssZ"),
        })),
    };
};
