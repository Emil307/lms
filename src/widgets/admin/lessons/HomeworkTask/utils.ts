import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import calendar from "dayjs/plugin/calendar";

dayjs.extend(updateLocale);
dayjs.extend(calendar);

export const getFormatUpdatedAt = (date: Date): string => {
    return dayjs(date).calendar(null, {
        sameDay: "[Сегодня], HH:mm",
        lastDay: "[Вчера], HH:mm ",
        lastWeek: "DD.MM.YYYY, HH:mm",
        sameElse: "DD.MM.YYYY, HH:mm",
    });
};
