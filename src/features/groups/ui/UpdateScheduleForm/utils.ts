import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AdminGroupScheduleFromList, UpdateAdminGroupScheduleRequest } from "@entities/group";
import { UpdateScheduleFormValidation } from "./types";

dayjs.extend(utc);
dayjs.utc().format();

export const adaptUpdateScheduleForm = (data?: AdminGroupScheduleFromList): Partial<UpdateScheduleFormValidation> => {
    const currentDay = dayjs();
    return {
        scheduleDate: data?.date,
        scheduleTimings: data?.timings.map((timing) => ({
            ...timing,
            from: dayjs(timing.from).set("day", currentDay.get("day")).toDate(),
            to: dayjs(timing.to).set("day", currentDay.get("day")).toDate(),
        })),
    };
};

export const adaptUpdateGroupScheduleRequest = (
    data: UpdateScheduleFormValidation
): Omit<UpdateAdminGroupScheduleRequest, "groupId" | "scheduleId"> => {
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
