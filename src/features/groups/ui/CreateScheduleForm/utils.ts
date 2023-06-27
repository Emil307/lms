import dayjs from "dayjs";
import { CreateAdminGroupScheduleRequest } from "@entities/group";
import { CreateScheduleFormValidation } from "./types";

export const adaptCreateGroupScheduleRequest = (data: CreateScheduleFormValidation): Omit<CreateAdminGroupScheduleRequest, "groupId"> => {
    const { scheduleDate, scheduleTimings = [] } = data;
    return {
        scheduleDate: dayjs(scheduleDate).format("YYYY-MM-DD"),
        scheduleTimings: scheduleTimings.map((timing) => ({
            from: dayjs(timing.from).format("YYYY-MM-DD HH:mm:ssZ"),
            to: dayjs(timing.to).format("YYYY-MM-DD HH:mm:ssZ"),
        })),
    };
};
