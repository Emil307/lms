import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AdminGroupScheduleFromList, UpdateAdminGroupScheduleRequest } from "@entities/group";
import { UpdateScheduleFormValidation } from "./types";

dayjs.extend(utc);
dayjs.utc().format();

export const adaptUpdateScheduleForm = (data?: AdminGroupScheduleFromList): Partial<UpdateScheduleFormValidation> => {
    return {
        scheduleDate: data?.date,
        scheduleTimings: data?.timings.map((timing) => ({
            ...timing,
            from: dayjs(timing.from).toDate(),
            to: dayjs(timing.to).toDate(),
        })),
    };
};

export const adaptUpdateGroupScheduleRequest = (
    data: UpdateScheduleFormValidation,
): Omit<UpdateAdminGroupScheduleRequest, "groupId" | "scheduleId"> => {
    const { scheduleDate, scheduleTimings = [] } = data;
    return {
        scheduleDate: dayjs(scheduleDate).format("YYYY-MM-DD"),
        scheduleTimings: scheduleTimings.map((timing) => ({
            ...(timing.id && { id: timing.id }),
            from: dayjs(timing.from).utc().format("YYYY-MM-DD HH:mm:ssZ"),
            to: dayjs(timing.to).utc().format("YYYY-MM-DD HH:mm:ssZ"),
        })),
    };
};
