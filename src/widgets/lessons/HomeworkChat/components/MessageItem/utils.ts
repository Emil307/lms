import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import calendar from "dayjs/plugin/calendar";

dayjs.extend(updateLocale);
dayjs.extend(calendar);

export const getFormatCreatedAt = (date: Date): string => {
    return dayjs(date).calendar(null, {
        sameDay: "[Сегодня], HH:mm", // The same day ( Today at 2:30 AM )
        lastDay: "[Вчера], HH:mm ", // The day before ( Yesterday at 2:30 AM )
        lastWeek: "DD.MM.YYYY, HH:mm",
        sameElse: "DD.MM.YYYY, HH:mm", // Everything else ( 7/10/2011 )
    });
};
