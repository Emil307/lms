import dayjs from "dayjs";
import { CreateAdminGroupScheduleRequest } from "@entities/group";
import { CreateScheduleFormValidation } from "./types";

export const adaptCreateGroupScheduleRequest = (data: CreateScheduleFormValidation): Omit<CreateAdminGroupScheduleRequest, "groupId"> => {
    const { scheduleDate, scheduleTimings = [] } = data;
    const day = dayjs(scheduleDate).get("date");
    const month = dayjs(scheduleDate).get("month");
    const year = dayjs(scheduleDate).get("year");

    return {
        scheduleDate: dayjs(scheduleDate).format("YYYY-MM-DD"),
        scheduleTimings: scheduleTimings.map((timing) => {
            const from = dayjs(timing.from).set("date", day).set("month", month).set("year", year);
            const to = dayjs(timing.to).set("date", day).set("month", month).set("year", year);

            return {
                from: dayjs(from).format("YYYY-MM-DD HH:mm:ssZ"),
                to: dayjs(to).format("YYYY-MM-DD HH:mm:ssZ"),
            };
        }),
    };
};
